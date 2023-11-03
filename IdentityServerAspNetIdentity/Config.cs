using Duende.IdentityServer;
using Duende.IdentityServer.Models;
using IdentityModel;

namespace IdentityServerAspNetIdentity;

public static class Config
{
    public static IEnumerable<IdentityResource> IdentityResources =>
        new IdentityResource[]
        {
            new IdentityResources.OpenId(),
            new IdentityResources.Profile(),
            new IdentityResource()
            {
                Name = "verification",
                UserClaims = new List<string>
                {
                    JwtClaimTypes.Email,
                    JwtClaimTypes.EmailVerified
                }
            },
            new IdentityResource("color", new [] {"favorite_color"})
        };

    public static IEnumerable<ApiScope> ApiScopes =>
        new ApiScope[]
            {
            new ApiScope(name: "api1", displayName: "MyAPI")
            };

    public static IEnumerable<Client> Clients =>
        new Client[]
            {

                new Client
                {
                    ClientId = "client",
                    AllowedGrantTypes = GrantTypes.ClientCredentials,
                    ClientSecrets =
                    {
                        new Secret ("secret".Sha256())
                    },
                    AllowedScopes = { "api1" }
                },

                new Client
                {
                    ClientId = "web",
                    AllowedGrantTypes = GrantTypes.Code,
                    /*ClientSecrets =
                    {
                        new Secret("secret".Sha256())
                    },*/

                    RequireClientSecret = false,

                    RedirectUris = { "http://localhost:4200/home" },
                    PostLogoutRedirectUris = { "http://localhost:4200/home" },
                    AllowOfflineAccess = true,
                    AllowedCorsOrigins = {"http://localhost:4200" },

                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "verification",
                        "api1",
                        "color"
                    }
                }

            };
}
