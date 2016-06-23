using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SistemaDomotico
{
    public partial class Equipamento : System.Web.UI.Page 
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            
        }

        protected void ListView1_ItemInserting(object sender, ListViewInsertEventArgs e)
        {
            //DropDownList dropDown = ((DropDownList)e.Item.FindControl("tipoEquipamento"));
            //dropDown.Items.Add(new ListItem("Add New", "0"));

        }
        
    }
}