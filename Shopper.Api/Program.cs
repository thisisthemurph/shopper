using System.Text;
using Shopper.Api.Contexts;
using Shopper.Api.Extensions;
using Shopper.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// Secrets
var jwtSecret = builder.Configuration["Secrets:JwtSecret"];
var emailServiceToken = builder.Configuration["Secrets:EmailServiceToken"];

builder.Services.AddDbContext<ShoppingListContext>();
var corsPolicyName = builder.Services.ConfigureCors();
builder.Services.AddControllers();

builder.Services.ConfigureSwagger();

// Configure authentication
builder.Services.ConfigureAuthentication(jwtSecret);

// Register services
builder.Services.AddScoped<ISercretsService, SecretsService>();
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
