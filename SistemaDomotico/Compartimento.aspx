<%@ Page Title="" Language="C#" MasterPageFile="~/SistemaDomotico.Master" AutoEventWireup="true"
     CodeBehind="Compartimento.aspx.cs" Inherits="SistemaDomotico.Compartimento" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h2>
        Compartimento
    </h2>
        <asp:ListView ID="ListView1" runat="server" DataKeyNames="id" DataSourceID="compDatasource" InsertItemPosition="LastItem">
            <AlternatingItemTemplate>
                <tr style="background-color:#FAFAD2; color: #284775;">
                    <td>
                        <asp:Button ID="DeleteButton" runat="server" CommandName="Delete" Text="Delete" />
                        <asp:Button ID="EditButton" runat="server" CommandName="Edit" Text="Edit" />
                    </td>
                   <%-- <td>
                        <asp:Label ID="nomeLabel" runat="server" Text='<%# Eval("nome") %>' />
                    </td>--%>
                     <td>
                        <asp:LinkButton ID="nameLabel" runat="server" Text='<%# Eval("nome") %>' 
                            
                             OnClientClick='<%#"showDetails(" +Eval("id") + " );return false" %>'
                            />
                    </td>
                    <td hidden="hidden">
                        <asp:Label ID="idLabel" runat="server" Text='<%# Eval("id") %>' />
                    </td>
                </tr>
            </AlternatingItemTemplate>
            <EditItemTemplate>
                <tr style="background-color:#FFCC66; color: #000080;">
                    <td>
                        <asp:Button ID="UpdateButton" runat="server" CommandName="Update" Text="Update" />
                        <asp:Button ID="CancelButton" runat="server" CommandName="Cancel" Text="Cancel" />
                    </td>
                    <td>
                        <asp:TextBox ID="nomeTextBox" runat="server" Text='<%# Bind("nome") %>' />
                    </td>
                       
                    <td hidden="hidden">
                        <asp:Label ID="idLabel1" runat="server" Text='<%# Eval("id") %>' />
                    </td>
                </tr>
            </EditItemTemplate>
            <EmptyDataTemplate>
                <table runat="server" style="background-color: #FFFFFF;border-collapse: collapse;border-color: #999999;border-style:none;border-width:1px;">
                    <tr>
                        <td>No data was returned.</td>
                    </tr>
                </table>
            </EmptyDataTemplate>
            <InsertItemTemplate>
                <tr style="">
                    <td>
                        <asp:Button ID="InsertButton" runat="server" CommandName="Insert" Text="Insert" />
                        <asp:Button ID="CancelButton" runat="server" CommandName="Cancel" Text="Clear" />
                    </td>
                    <td>
                        <asp:TextBox ID="nomeTextBox" runat="server" Text='<%# Bind("nome") %>' />
                    </td>
                    <td hidden="hidden">
                        <asp:TextBox ID="idTextBox" runat="server" Text='<%# Bind("id") %>' />
                    </td>
                     


                </tr>
            </InsertItemTemplate>
            <ItemTemplate>
                <tr style="background-color:#FFFBD6; color: #333333;">
                    <td>
                        <asp:Button ID="DeleteButton" runat="server" CommandName="Delete" Text="Delete" />
                        <asp:Button ID="EditButton" runat="server" CommandName="Edit" Text="Edit" />
                    </td>
                  <td>
                        <asp:LinkButton ID="nameLabel" runat="server" Text='<%# Eval("nome") %>' 
                            OnClientClick='<%#"showDetails(" +Eval("id") + " );return false" %>'
                                                 
                            
                             />
                    </td>
                    <td hidden="hidden">
                        <asp:Label ID="idLabel" runat="server" Text='<%# Eval("id") %>' />
                    </td>
                </tr>
            </ItemTemplate>
            <LayoutTemplate>
                <table runat="server">
                    <tr runat="server">
                        <td runat="server">
                            <table id="itemPlaceholderContainer" runat="server" border="1" style="background-color: #FFFFFF;border-collapse: collapse;border-color: #999999;border-style:none;border-width:1px;font-family: Verdana, Arial, Helvetica, sans-serif;">
                              
                               
                                 <tr runat="server" style="background-color:#FFFBD6; color: #333333;">
                                    <th runat="server"></th>
                                    <th runat="server">nome</th>
                                    <%--<th runat="server">id</th>--%>
                                </tr>
                                <tr id="itemPlaceholder" runat="server">
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr runat="server">
                        <td runat="server" style="text-align: center;background-color: #FFCC66; font-family: Verdana, Arial, Helvetica, sans-serif;color: #333333;"></td>
                    </tr>
                </table>
            </LayoutTemplate>
            <SelectedItemTemplate>
                <tr style="background-color:#FFCC66; font-weight: bold;color: #000080;">
                    <td>
                        <asp:Button ID="DeleteButton" runat="server" CommandName="Delete" Text="Delete" />
                        <asp:Button ID="EditButton" runat="server" CommandName="Edit" Text="Edit" />
                    </td>
                    <td>
                        <asp:Label ID="nomeLabel" runat="server" Text='<%# Eval("nome") %>' />
                    </td>
                    <td hidden="hidden">
                        <asp:Label ID="idLabel" runat="server" Text='<%# Eval("id") %>' />
                    </td>
                </tr>
            </SelectedItemTemplate>
        </asp:ListView>
        <asp:SqlDataSource ID="compDatasource" runat="server" ConnectionString="<%$ ConnectionStrings:sistemaDomoticoConnectionString %>" DeleteCommand="DELETE FROM [Compartimento] WHERE [id] = @id" InsertCommand="INSERT INTO Compartimento(nome,  fk_consola) VALUES (@nome, @fk_consola)" SelectCommand="SELECT [nome], [id] FROM [Compartimento] WHERE ([fk_consola] = @fk_consola) ORDER BY [nome]" UpdateCommand="UPDATE [Compartimento] SET [nome] = @nome WHERE [id] = @id">
            <DeleteParameters>
                <asp:Parameter Name="id" Type="Int32" />
            </DeleteParameters>
            <InsertParameters>
                <asp:Parameter Name="nome" Type="String" />
                 <asp:QueryStringParameter DefaultValue="61" Name="fk_consola" QueryStringField="id" Type="Int32" />
              
            </InsertParameters>
            <SelectParameters>
                <asp:QueryStringParameter  DefaultValue="61" Name="fk_consola" QueryStringField="id" Type="Int32" />
            </SelectParameters>
            <UpdateParameters>
                <asp:Parameter Name="nome" Type="String" />
                <asp:Parameter Name="id" Type="Int32" />
            </UpdateParameters>
        </asp:SqlDataSource>
    
   <script type="text/javascript">
        function showDetails(id) {
            window.location.href = '../Equipamento.aspx?id=' + id;

        }
    </script>
</asp:Content>