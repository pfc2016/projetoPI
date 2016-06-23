using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(SistemaDomotico.Startup))]
namespace SistemaDomotico
{
    public partial class Startup {
        public void Configuration(IAppBuilder app) {
            ConfigureAuth(app);
        }
    }
}
