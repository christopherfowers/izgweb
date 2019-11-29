using IZGWeb.Core;
using IZGWeb.Core.Interface;
using IZGWeb.Data;
using IZGWeb.Data.Interface;
using IZGWeb.Logger;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Swashbuckle.AspNetCore.Swagger;

namespace IZGWeb
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
            services.AddMvc();
            services.AddResponseCompression();

            #region AuthenticationServices
            string domain = $"https://{Configuration["Auth0:Domain"]}/";
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

            }).AddJwtBearer(options =>
            {
                options.Authority = domain;
                options.Audience = Configuration["Auth0:ApiIdentifier"];
            });
            
            services.AddAuthorization(options => { AddPermissionsRequirements(options, domain); });
            #endregion
            
            var mongoConnectionString = Configuration.GetSection("ConnectionStrings:MongoDb").Value;
            
            services.Configure<MongoOptions>(
                options =>
                {
                    options.ConnectionString = mongoConnectionString;
                    options.Database = "unitweb";
                });
            
            services.AddTransient<IRepository, MongoRepository>();
            services.AddSingleton<IUserService, UserService>();
            services.AddSingleton<ISpellService, SpellService>();
            
            services.AddSingleton<ILogger>(new LogglyLogger(Configuration["Loggly:ApiKey"]));
            
            services.AddSingleton<IAuthorizationHandler, HasPermissionHandler>();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration => { configuration.RootPath = "ClientApp/build"; });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseRouting();

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();


            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });

            app.UseAuthentication();
            app.UseAuthorization();
            
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";
                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
        
        private static void AddPermissionsRequirements(AuthorizationOptions options, string domain)
        {
            options.AddPolicy("read:gamedata",
                policy => policy.Requirements.Add(new HasPermissionRequirement("read:gamedata", domain)));
            options.AddPolicy("create:gamedata",
                policy => policy.Requirements.Add(new HasPermissionRequirement("create:gamedata", domain)));
            options.AddPolicy("edit:gamedata",
                policy => policy.Requirements.Add(new HasPermissionRequirement("edit:gamedata", domain)));
            options.AddPolicy("delete:gamedata",
                policy => policy.Requirements.Add(new HasPermissionRequirement("delete:gamedata", domain)));
            options.AddPolicy("read:users",
                policy => policy.Requirements.Add(new HasPermissionRequirement("read:users", domain)));
        }
    }
}