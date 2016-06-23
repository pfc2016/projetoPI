<%@ Page Title="" Language="C#" MasterPageFile="~/SistemaDomotico.Master" AutoEventWireup="true" CodeBehind="Equipamento.aspx.cs" Inherits="SistemaDomotico.Equipamento" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div>
        <h1>Equipamentos</h1>
        <asp:Button runat="server" Text="Listagem" />
        <asp:Button runat="server" Text="Monitorizar" OnClientClick="obterFicheiroJson() ;return false" />

    </div>
    <asp:ListView ID="ListView1" runat="server" DataKeyNames="id" DataSourceID="equipamentoDS" InsertItemPosition="LastItem">
        <AlternatingItemTemplate>
            <tr style="background-color: #FFF8DC;">
                <td>
                    <asp:Button ID="DeleteButton" runat="server" CommandName="Delete" Text="Delete" />
                    <asp:Button ID="EditButton" runat="server" CommandName="Edit" Text="Edit" />
                </td>
                <td>
                    <asp:Label ID="nomeLabel" runat="server" Text='<%# Eval("nome") %>' />
                </td>
                <%-- <td>
                            <asp:Label ID="idLabel" runat="server" Text='<%# Eval("id") %>' />
                        </td>--%>
                <td>
                    <asp:Label ID="estadoLabel" runat="server" Text='<%# Eval("estado") %>' />
                </td>
                <%--  <td>
                            <asp:Label ID="fk_compartimentoLabel" runat="server" Text='<%# Eval("fk_compartimento") %>' />
                        </td>--%>
                <td>
                    <asp:Label ID="fk_tipoEquipamentoLabel" runat="server" Text='<%# Eval("fk_tipoEquipamento") %>' />
                </td>
            </tr>
        </AlternatingItemTemplate>
        <EditItemTemplate>
            <tr style="background-color: #008A8C; color: #FFFFFF;">
                <td>
                    <asp:Button ID="UpdateButton" runat="server" CommandName="Update" Text="Update" />
                    <asp:Button ID="CancelButton" runat="server" CommandName="Cancel" Text="Cancel" />
                </td>
                <td>
                    <asp:TextBox ID="nomeTextBox" runat="server" Text='<%# Bind("nome") %>' />
                </td>
                <td hidden="hidden">
                    <asp:Label ID="idLabel1" runat="server" Text='<%# Eval("id") %>' Visible="false" />
                </td>
                <td>
                    <asp:TextBox ID="estadoTextBox" runat="server" Text='<%# Bind("estado") %>' />
                </td>
                <%-- <td>
                            <asp:TextBox ID="fk_compartimentoTextBox" runat="server" Text='<%# Bind("fk_compartimento") %>' />
                        </td>--%>
                <td>
                    <asp:TextBox ID="fk_tipoEquipamentoTextBox" runat="server" Text='<%# Bind("fk_tipoEquipamento") %>' />
                </td>
            </tr>
        </EditItemTemplate>
        <EmptyDataTemplate>
            <table runat="server" style="background-color: #FFFFFF; border-collapse: collapse; border-color: #999999; border-style: none; border-width: 1px;">
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
                <%-- <td>&nbsp;</td>--%>
                <td>
                    <asp:TextBox ID="estadoTextBox" runat="server" Text='<%# Bind("estado") %>' />
                </td>
                <%-- <td hidden="hidden">
                            <asp:TextBox ID="fk_compartimentoTextBox" runat="server" Text='<%# Bind("fk_compartimento") %>' />
                        </td>--%>
                <td>
                    <asp:DropDownList runat="server" ID="tipoEquipamento" SelectedValue='<%#Bind("fk_tipoEquipamento")%>'>

                        <asp:ListItem Text="Please select an option" Value="0" />
                        <asp:ListItem Text="Termometro" Value="1" />
                        <asp:ListItem Text="ArCondicionado" Value="2" />
                        <asp:ListItem Text="DetetorDeMovimento" Value="3" />
                        <asp:ListItem Text="GeradorDeMovimento" Value="12" />
                        <asp:ListItem Text="DetetorFecho" Value="13" />
                        <asp:ListItem Text="TrincoEletrico" Value="14" />
                        <asp:ListItem Text="DetetorPosicaoEstoreEletrico" Value="15" />
                        <asp:ListItem Text="MotorEletricoEstore" Value="16" />
                    </asp:DropDownList>
                </td>
            </tr>

        </InsertItemTemplate>
        <ItemTemplate>
            <tr style="background-color: #DCDCDC; color: #000000;">
                <td>
                    <asp:Button ID="DeleteButton" runat="server" CommandName="Delete" Text="Delete" />
                    <asp:Button ID="EditButton" runat="server" CommandName="Edit" Text="Edit" />
                </td>
                <td>
                    <asp:Label ID="nomeLabel" runat="server" Text='<%# Eval("nome") %>' />
                </td>
                <%--<td>
                            <asp:Label ID="idLabel" runat="server" Text='<%# Eval("id") %>' />
                        </td>--%>
                <td>
                    <asp:Label ID="estadoLabel" runat="server" Text='<%# Eval("estado") %>' />
                </td>
                <%-- <td>
                            <asp:Label ID="fk_compartimentoLabel" runat="server" Text='<%# Eval("fk_compartimento") %>' />
                        </td>--%>
                <td>
                    <asp:Label ID="fk_tipoEquipamentoLabel" runat="server" Text='<%# Eval("fk_tipoEquipamento") %>' />
                </td>
            </tr>
        </ItemTemplate>

        <LayoutTemplate>
            <table runat="server">
                <tr runat="server">
                    <td runat="server">
                        <table id="itemPlaceholderContainer" runat="server" border="1" style="background-color: #FFFFFF; border-collapse: collapse; border-color: #999999; border-style: none; border-width: 1px; font-family: Verdana, Arial, Helvetica, sans-serif;">
                            <tr runat="server" style="background-color: #DCDCDC; color: #000000;">
                                <th runat="server"></th>
                                <th runat="server">nome</th>
                                <%--  <th runat="server">id</th>--%>
                                <th runat="server">estado</th>
                                <%--    <th runat="server">fk_compartimento</th>--%>
                                <th runat="server">fk_tipoEquipamento</th>
                            </tr>
                            <tr id="itemPlaceholder" runat="server">
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr runat="server">
                    <td runat="server" style="text-align: center; background-color: #CCCCCC; font-family: Verdana, Arial, Helvetica, sans-serif; color: #000000;"></td>
                </tr>
            </table>
        </LayoutTemplate>
        <SelectedItemTemplate>
            <tr style="background-color: #008A8C; font-weight: bold; color: #FFFFFF;">
                <td>
                    <asp:Button ID="DeleteButton" runat="server" CommandName="Delete" Text="Delete" />
                    <asp:Button ID="EditButton" runat="server" CommandName="Edit" Text="Edit" />
                </td>
                <td>
                    <asp:Label ID="nomeLabel" runat="server" Text='<%# Eval("nome") %>' />
                </td>
                <%-- <td>
                            <asp:Label ID="idLabel" runat="server" Text='<%# Eval("id") %>' />
                        </td>--%>
                <td>
                    <asp:Label ID="estadoLabel" runat="server" Text='<%# Eval("estado") %>' />
                </td>
                <%-- <td>
                            <asp:Label ID="fk_compartimentoLabel" runat="server" Text='<%# Eval("fk_compartimento") %>' />
                        </td>--%>
                <td>
                    <asp:Label ID="fk_tipoEquipamentoLabel" runat="server" Text='<%# Eval("fk_tipoEquipamento") %>' />
                </td>
            </tr>
        </SelectedItemTemplate>
    </asp:ListView>
    </div>
       
    <asp:SqlDataSource ID="equipamentoDS" runat="server"
        ConnectionString="<%$ ConnectionStrings:sistemaDomoticoConnectionString %>"
        DeleteCommand="DELETE FROM [Equipamento] WHERE [id] = @id"
        InsertCommand="INSERT INTO [Equipamento] ([nome], [estado], [fk_compartimento], [fk_tipoEquipamento]) VALUES (@nome, @estado, @fk_compartimento, @fk_tipoEquipamento)"
        SelectCommand="SELECT * FROM [Equipamento] WHERE ([fk_compartimento] = @fk_compartimento) ORDER BY [nome]"
        UpdateCommand="UPDATE [Equipamento] SET [nome] = @nome, [estado] = @estado, [fk_compartimento] = @fk_compartimento, [fk_tipoEquipamento] = @fk_tipoEquipamento WHERE [id] = @id">
        <DeleteParameters>
            <asp:Parameter Name="id" Type="Int32" />
        </DeleteParameters>
        <InsertParameters>
            <asp:Parameter Name="nome" Type="String" />
            <asp:Parameter Name="estado" Type="Int32" />
            <asp:Parameter Name="tipoEquipamento" Type="Int32" />
            <asp:QueryStringParameter Name="fk_compartimento" QueryStringField="id" Type="Int32" />
            <%--<asp:ControlParameter ControlID="tipoEquipamento" Name="fk_tipoEquipamento" Type="Int32" PropertyName="SelectedValue" />--%>
            <%-- <asp:Parameter Name="fk_tipoEquipamento" Type="Int32" />--%>
        </InsertParameters>
        <SelectParameters>
            <asp:QueryStringParameter Name="fk_compartimento" QueryStringField="id" Type="Int32" />
        </SelectParameters>
        <UpdateParameters>
            <asp:Parameter Name="nome" Type="String" />
            <asp:Parameter Name="estado" Type="Int32" />
            <asp:Parameter Name="fk_compartimento" Type="Int32" />
            <asp:Parameter Name="fk_tipoEquipamento" Type="Int32" />
            <asp:Parameter Name="id" Type="Int32" />
        </UpdateParameters>
    </asp:SqlDataSource>

    <script src="EquipamentoHttpHandler.js"></script>

</asp:Content>
