using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SistemaDomotico
{
    public partial class demo : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [ WebMethod]
       [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string test()
        {
            return "Hello";
        }
    }
}