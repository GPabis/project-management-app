import Header from "./components/Header";
import FormField from "./components/Register/FormField";
import Input from "./components/Register/Input";
import Label from "./components/Register/Label";
import Submit from "./components/Register/Submit";



function App() {
  return (
    <Header>
      <main>
        <Submit>Submit</Submit>

        <FormField>
          <Label>E-mail:</Label>
          <Input/>
        </FormField>
      </main>
    </Header>
  );
}

export default App;
