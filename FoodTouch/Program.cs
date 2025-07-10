//Para trabajar con las cookies
using Microsoft.AspNetCore.Authentication.Cookies;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

//Cookie
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(option =>
    {
        option.LoginPath = "/Acceso/Index";
        option.ExpireTimeSpan = TimeSpan.FromMinutes(5);
        option.AccessDeniedPath = "/Home/Privacy";

    });


var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();





//Politicas CSP
//Middleware personalizado para agregar encabezado CSP a todas las respuestas
//app.Use(async (context, next) =>
//{
//    context.Response.Headers.Add("Content-Security-Policy",
//        "default-src 'self'; " +
//        "script-src 'self' 'unsafe-inline' https://kit.fontawesome.com https://cdn.jsdelivr.net; " +
//        "style-src 'self' 'unsafe-inline' https://kit-free.fontawesome.com; " +
//        "font-src 'self' https://ka-f.fontawesome.com https://cdnjs.cloudflare.com; " +
//        "connect-src *; " +
//        "img-src 'self' data:; " +
//        "object-src 'none'; " +
//        "base-uri 'self'; " +
//        "form-action 'self';");
//    await next();
//});








app.UseRouting();

//Autenticacion
app.UseAuthorization();
app.UseAuthorization();

// ⚠️ Este es el orden correcto:
//app.UseAuthentication(); // Primero autenticación
//app.UseAuthorization();  // Luego autorización

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
