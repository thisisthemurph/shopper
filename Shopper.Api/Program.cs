using System.Text;
using Shopper.Api.Auth.Services;
using Shopper.Api.Contexts;
using Shopper.Api.Extensions;
using Shopper.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// Database context
builder.Services.AddDbContext<ShoppingListContext>();

var corsPolicyName = builder.Services.ConfigureCors();
builder.Services.AddControllers();

builder.Services.ConfigureSwagger();

// Configure authentication
var jwtSecret = builder.Configuration["Secrets:JwtSecret"];
builder.Services.ConfigureAuthentication(jwtSecret);

// Register services
builder.Services.AddScoped<ISercretsService, SecretsService>();
builder.Services.AddScoped<IContextService, ContextService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IEmailService, EmailService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(corsPolicyName);

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
