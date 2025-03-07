import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Text,
  } from '@react-email/components';
  
  interface EmailProps {
    name: string;
    email: string;
    message: string;
  }
  
  export const Email = ({
    name,
    email,
    message,
  }: EmailProps) => (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>New Form Submission from {name}</Preview>
        <Container style={container}>
          <Heading style={heading}>New Form Submission from {name}</Heading>
          <Text style={paragraph}>
            {message}
          </Text>
          <Hr style={hr} />
        </Container>
      </Body>
    </Html>
  );
  
  export default Email;
  
  const main = {
    backgroundColor: '#ffffff',
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  };
  
  const container = {
    margin: '0 auto',
    padding: '20px 0 48px',
    maxWidth: '560px',
  };
  
  const heading = {
    fontSize: '24px',
    letterSpacing: '-0.5px',
    lineHeight: '1.3',
    fontWeight: '400',
    color: '#484848',
    padding: '17px 0 0',
  };
  
  const paragraph = {
    margin: '0 0 15px',
    fontSize: '15px',
    lineHeight: '1.4',
    color: '#3c4149',
  };
  
  const hr = {
    borderColor: '#dfe1e4',
    margin: '42px 0 26px',
  };