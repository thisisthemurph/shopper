using System.Text;
using Shopper.Api.Contexts;
using Shopper.Api.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ShoppingListContext>();
var corsPolicyName = builder.Services.ConfigureCors();
builder.Services.AddControllers();

builder.Services.ConfigureSwagger();

// Configure authentication
var secretToken = Encoding.UTF8.GetBytes(builder.Configuration.GetSection("AppSettings:Token").Value);
builder.Services.ConfigureAuthentication(secretToken);

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
