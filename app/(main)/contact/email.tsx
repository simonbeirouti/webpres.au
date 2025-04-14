import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Text,
    Section,
} from '@react-email/components';

interface EmailProps {
    name: string;
    email: string;
    message: string;
    company: string;
    projectType: string;
}

export const Email = ({
    name,
    email,
    company,
    message,
    projectType,
}: EmailProps) => {

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
        margin: '26px 0',
    };

    const section = {
        margin: '0 0 15px',
    };

    const labelStyle = {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#484848',
        margin: '0 0 8px',
    };

    const infoText = {
        margin: '0 0 5px',
        fontSize: '14px',
        lineHeight: '1.4',
        color: '#3c4149',
    };

    const valueStyle = {
        fontWeight: '500',
    };

    return (
        <Html>
            <Head />
            <Body style={main}>
                <Preview>New Form Submission from {name}</Preview>
                <Container style={container}>
                    <Heading style={heading}>New Form Submission from {name}</Heading>

                    <Section style={section}>
                        <Text style={labelStyle}>Contact Information:</Text>
                        <Text style={infoText}>Name: <span style={valueStyle}>{name}</span></Text>
                        <Text style={infoText}>Email: <span style={valueStyle}>{email}</span></Text>
                        <Text style={infoText}>Company: <span style={valueStyle}>{company}</span></Text>
                    </Section>

                    <Hr style={hr} />

                    <Section style={section}>
                        <Text style={labelStyle}>Project Details:</Text>
                        <Text style={infoText}>Project Type: <span style={valueStyle}>{projectType}</span></Text>
                    </Section>

                    <Hr style={hr} />

                    <Section style={section}>
                        <Text style={labelStyle}>Message:</Text>
                        <Text style={paragraph}>{message}</Text>
                    </Section>

                    <Hr style={hr} />
                </Container>
            </Body>
        </Html>
    )
}