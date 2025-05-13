using System.Text;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http.Timeouts;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using peachtree_bank_backend;
using peachtree_bank_backend.Data;

namespace peachtree_bank_backend;

public class Program
{
    private static readonly string PeachtreeCorsPolicy = "PeachtreeCorsPolicy";

    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddDbContext<MainContext>(options =>
        {
            var connectionString = builder.Configuration.GetConnectionString("MainConnectionString");
            options.UseSqlServer(connectionString);
        });

        builder
            .Services.AddControllers()
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
            });

        builder.Services.AddEndpointsApiExplorer();

        builder.Services.AddSwagger();

        builder.Services.AddCors(options =>
        {
            options.AddPolicy(
                PeachtreeCorsPolicy,
                policy =>
                {
                    policy
                        .SetIsOriginAllowedToAllowWildcardSubdomains()
                        .SetIsOriginAllowed(origin =>
                            new Uri(origin).Host is "localhost"
                        )
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .WithExposedHeaders("Content-Disposition");
                }
            );
        });

        builder.Services.AddRequestTimeouts(options =>
        {
            options.DefaultPolicy = new RequestTimeoutPolicy { Timeout = TimeSpan.FromMinutes(5) };
            options.AddPolicy("PeachtreePolicy", TimeSpan.FromMinutes(5));
        });

        builder.Services.AddRepositories();
        builder.Services.AddManagers();
        builder.Services.AddAutoMapper(typeof(AutoMapperProfile));
        
        var jwtSettings = builder.Configuration.GetSection("JwtSettings");
        builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jwtSettings["Issuer"],
                    ValidAudience = jwtSettings["Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]))
                };
            });

        var app = builder.Build();

        app.UseSwagger();
        app.UseSwaggerUI();

        app.UseCors(PeachtreeCorsPolicy);
        
        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}