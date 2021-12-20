namespace meetup_rest_api.Features.Public.RegistrationTemplate
{
    public class AuthorizationModel
    {
        public string Email { get; set; }

        public string Password { get; set; }

        public AuthorizationModel() {

        }

        public AuthorizationModel(string email, string password)
        {
            this.Email = email;
            this.Password = password;
        }
    }
}