using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.CookiePolicy;
using meetup_rest_api.Features.Public.Login;

namespace meetup_rest_api
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddControllers();
			services.AddSwaggerGen(c =>
			{
				c.SwaggerDoc("v1", new OpenApiInfo { Title = "meetup-rest-api", Version = "v1" });
				c.CustomSchemaIds(type => type.ToString());
			});
			TokenValidationParameters tokenValidationParameters = new TokenValidationParameters
			{
				ValidateIssuer = false,
				ValidateAudience = false,
				ValidateLifetime = true,
				IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration["Jwt:Key"])),
				ValidateIssuerSigningKey = true
			};
			services.AddSingleton(tokenValidationParameters);
			services.AddScoped<UserService>();
			services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
					.AddJwtBearer(options =>
					{
						options.RequireHttpsMetadata = false;
						options.SaveToken = true;
						options.TokenValidationParameters = tokenValidationParameters;
					});
			services.AddDbContext<MeetupContext>(options =>
				options
				.UseNpgsql(Configuration.GetConnectionString("DefaultConnection"))
				.UseSnakeCaseNamingConvention()
			);

		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
				app.UseSwagger();
				app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "todo_rest_api v1"));
			}
			else
			{
				app.UseHttpsRedirection();
			}

			app.UseRouting();

			app.UseCors(x => x
				.AllowAnyMethod()
				.AllowAnyHeader()
				.AllowCredentials()
				.SetIsOriginAllowed(origin => true));

			app.UseCookiePolicy(new CookiePolicyOptions
			{
				MinimumSameSitePolicy = SameSiteMode.Strict,
				HttpOnly = HttpOnlyPolicy.Always,
				Secure = CookieSecurePolicy.SameAsRequest
			});
			app.Use(async (context, next) =>
			{
				string token = context.Request.Cookies[".AspNetCore.Application.Id"];
				if (!string.IsNullOrEmpty(token))
					context.Request.Headers.Add("Authorization", "Bearer " + token);

				await next();
			});
			app.UseAuthentication();
			app.UseAuthorization();
			app.Use(async (context, next) =>
			{
				UserService UserService = context.RequestServices.GetService<UserService>();
				if(context.User.Identity.IsAuthenticated){
					UserService.CurrentUserId = Convert.ToInt32(context.User.FindFirst(claim => claim.Type == "userId").Value);
				}
				else{
					UserService.CurrentUserId = 0;
				}

				await next();
			});
			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllers();

			});
		}
	}
}
