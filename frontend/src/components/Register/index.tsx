import Container from '../util/Container';
import { Submit, FormField, Label, Input, ErrorLabel, Form } from '../util/Form';

const Register = () => {
    return (
        <Container center={true}>
            <Form>
                <FormField>
                    <Label>E-mail:</Label>
                    <Input />
                    <ErrorLabel>Test</ErrorLabel>
                </FormField>
                <FormField>
                    <Label>Password:</Label>
                    <Input />
                    <ErrorLabel>Test</ErrorLabel>
                </FormField>
                <Submit>Submit</Submit>
            </Form>
        </Container>
    );
};

export default Register;
