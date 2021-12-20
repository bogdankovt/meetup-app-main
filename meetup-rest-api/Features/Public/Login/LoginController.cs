using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using meetup_rest_api.Core.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace meetup_rest_api.Features.Public.Login
{
	[Route("api/auth")]
	[ApiController]
	public class LoginController : ControllerBase
	{
		MeetupContext db;
		IConfiguration Configuration;
		TokenValidationParameters TokenValidationParameters;
		UserService UserService;

		public LoginController(MeetupContext context, IConfiguration config, TokenValidationParameters tokenValidationParameters, UserService userService)
		{
			TokenValidationParameters = tokenValidationParameters;
			db = context;
			Configuration = config;
			UserService = userService;

		}
		
		[HttpDelete("cookie")]
		public IActionResult Logout(){
			HttpContext.Response.Cookies.Delete(".AspNetCore.Application.Id");
			return Ok();
		}

		[HttpGet("status")]
		public IActionResult GetStatus()
		{
			if (HttpContext.User.Identity.IsAuthenticated == false)
			{
				return Ok(new
				{
					Authenticated = false,
					Role = "Anonym",
					DisplayName = ""
				});
			}
			else
			{
				User user = db.Users.ToList().FirstOrDefault(user => user.Id == Convert.ToInt32(HttpContext.User.FindFirst(claim => claim.Type == "userId").Value));
				string userRole = db.Roles.FirstOrDefault(role => role.Id == user.RoleId).Name;
				Guest guest = db.Guests.FirstOrDefault(guest => guest.Id == user.GuestId);
				return Ok(new
				{
					Authenticated = true,
					Role = userRole,
					DisplayName = (userRole == "Guest") ? $"{guest.FirstName} {guest.LastName}" : $"{user.Email}"
				});
			}
		}

		[HttpPost("login")]
		public IActionResult CreateAccessToken(LoginModel loginData)
		{
			ClaimsIdentity identity = GetIdentity(loginData);
			if (identity == null)
			{
				return BadRequest(new
				{
					Authenticated = false,
					Role = "Anonym",
					DisplayName = ""
				});
			}
			int currentUserId = Convert.ToInt32(identity.Claims.FirstOrDefault(claim => claim.Type == "userId").Value);
			UserService.CurrentUserId = currentUserId;
			User user = db.Users.FirstOrDefault(user => user.Id == currentUserId);
			string userRole = db.Roles.FirstOrDefault(role => role.Id == user.RoleId).Name;
			Guest guest = db.Guests.FirstOrDefault(guest => guest.Id == user.GuestId);
			DateTime now = DateTime.UtcNow;
			JwtSecurityToken jwt = new JwtSecurityToken(
					notBefore: now,
					claims: identity.Claims,
					expires: now.Add(TimeSpan.FromDays(Convert.ToDouble(Configuration["Jwt:Lifetime"]))),
					signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration["Jwt:Key"])), SecurityAlgorithms.HmacSha256));
			string token = new JwtSecurityTokenHandler().WriteToken(jwt);
			HttpContext.Response.Cookies.Append(".AspNetCore.Application.Id", token);
			return Ok(new
			{
				Authenticated = true,
				Role = userRole,
				DisplayName = (userRole == "Guest") ? $"{guest.FirstName} {guest.LastName}" : $"{user.Email}"
			});
		}

		private ClaimsIdentity GetIdentity(LoginModel loginData)
		{
			string userId = "";
			string roleName;
			User user = db.Users.FirstOrDefault(user => user.Email == loginData.Email);
			if (user != null && IsPasswordVerified(loginData.Password, user.Password))
			{
				if (user.RoleId != 0)
				{
					roleName = db.Roles.FirstOrDefault(role => role.Id == user.RoleId).Name;
				}
				else
				{
					roleName = "Admin";
				}
				userId = user.Id.ToString();
				var claims = new List<Claim>
				{
					new Claim("userId",userId),
					new Claim(ClaimTypes.Role,roleName)
				};
				ClaimsIdentity claimsIdentity =
				new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
					ClaimsIdentity.DefaultRoleClaimType);
				return claimsIdentity;
			}
			return null;
		}

		private bool IsPasswordVerified(string password, string hashPassword)
		{
			return BCrypt.Net.BCrypt.Verify(password, hashPassword);
		}
	}
}