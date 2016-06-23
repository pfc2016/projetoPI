<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="demo.aspx.cs" Inherits="SistemaDomotico.demo" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
     
</head>
<<body>
    <form id="form1" runat="server">
        <asp:ScriptManager ID="ScriptManager1" runat="server" EnablePageMethods="true" />
      
        <div>           
            <asp:label ID="ucMyControl1" runat="server" />
        </div>
        </form>
</body>
   

    <script type="text/javascript">
        function test() {
          //   PageMethods.set_path(PageMethods.get_path() + '.aspx');
            PageMethods.set_path('demo.aspx');
            PageMethods.test(Onsuccess, Onerror)
        }

        function Onsuccess(result) {
            alert(result);
        }

        function Onerror(result) {
            alert(JSON.stringify(result));
        }
        test();
    </script>

</html>
