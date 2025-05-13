using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.OpenApi.Models;
using peachtree_bank_backend.Data.Repositories;
using peachtree_bank_backend.Data.Repositories.Abstractions;
using peachtree_bank_backend.Managers;
using peachtree_bank_backend.Managers.Abstractions;
using peachtree_bank_backend.Swagger;

namespace peachtree_bank_backend;

public static class ServiceExtensions
{
    public static IServiceCollection AddManagers(this IServiceCollection services)
    {
        services.AddTransient<ITransactionManager, TransactionManager>();

        return services;
    }
    
    public static IServiceCollection AddRepositories(this IServiceCollection services)
    {
        services.AddTransient<ITransactionRepository, TransactionRepository>();

        return services;
    }
    
    public static IServiceCollection AddSwagger(this IServiceCollection services)
    {
        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = "Peachtree Bank API", Version = "v1" });

            c.OperationFilter<AddHeaderParameterFilter>();

            c.TagActionsBy(api =>
            {
                if (api.GroupName != null)
                {
                    return [api.GroupName];
                }

                if (api.ActionDescriptor is ControllerActionDescriptor controllerActionDescriptor)
                {
                    return [controllerActionDescriptor.ControllerName];
                }

                throw new InvalidOperationException("Unable to determine tag for endpoint.");
            });

            c.DocInclusionPredicate((name, api) => true);

            c.AddSecurityDefinition(
                "Bearer",
                new OpenApiSecurityScheme
                {
                    Type = SecuritySchemeType.Http,
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Scheme = "bearer",
                    Description = "Please insert JWT token into field",
                }
            );

            c.AddSecurityRequirement(
                new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer",
                            },
                        },
                        Array.Empty<string>()
                    },
                }
            );
            c.MapType<DateOnly>(() => new OpenApiSchema { Type = "string", Format = "date" });
        });

        return services;
    }
}