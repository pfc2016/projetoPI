using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SistemaDomotico {
    public partial class EquipamentoHttphandler : System.Web.UI.Page, IHttpHandler {

        public new void ProcessRequest(HttpContext context) {
            //  context.Response.Write("bingo");
            selectData(context);
        }

        private void AccessDatabase(string selectCommand, out DbConnection dbConnection,
                                       out DbDataReader dbDataReader) {

            dbConnection = DbProviderFactories.GetFactory(ConfigurationManager.ConnectionStrings["sistemaDomoticoConnectionString"].ProviderName).CreateConnection();
            dbConnection.ConnectionString = ConfigurationManager.ConnectionStrings["sistemaDomoticoConnectionString"].ConnectionString;
            dbConnection.Open();
            DbCommand dbCommand = dbConnection.CreateCommand();
            dbCommand.CommandType = CommandType.Text;
            dbCommand.CommandText = selectCommand;
            dbDataReader = dbCommand.ExecuteReader(CommandBehavior.CloseConnection);
        }

        private void selectData(HttpContext context) {
            DbConnection dbConnection;
            DbDataReader dbDataReader;
            string sqlCommand = "select nome, fk_compartimento, estado from equipamento";
            AccessDatabase(sqlCommand, out dbConnection, out dbDataReader);
            StringBuilder resultado = new StringBuilder();
            while(dbDataReader.Read()) {
                if(resultado.Length != 0) {
                    resultado.Append(",");
                }
                resultado.AppendFormat("\"{0}\":{1}:\"{2}\"", dbDataReader.GetString(0), dbDataReader.GetInt32(1), dbDataReader.GetInt32(2));
            }
            dbDataReader.Close();
            dbConnection.Dispose();
            context.Response.ContentType = "application/json; charset=utf-8";
            if(resultado.Length != 0) {
                context.Response.Write("{" + resultado.ToString() + "}");
            }
        }

        public new bool IsReusable {
            get {
                return false;
                ;
            }

        }
    }
}
