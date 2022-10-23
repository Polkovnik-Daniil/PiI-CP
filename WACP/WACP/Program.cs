using Microsoft.Extensions.Configuration;
using WACP.Models;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment()) {
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();
app.UseAuthorization();

var connection = builder.Configuration.GetSection("ConnectionStrings").Get<String>(); 
builder.Services.AddDbContext<ApplicationContext>(options =>
                options.UseSqlServer(connection));
builder.Services.AddControllersWithViews();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
