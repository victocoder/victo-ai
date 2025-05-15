import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

const codeString = `
function helloWorld() {
  console.log("Hello, World!");
}
`;


const CodeBlocComp = () => {
  return (
       <SyntaxHighlighter language="javascript" style={dracula}>
      {codeString}
    </SyntaxHighlighter>
  )
}

export default CodeBlocComp
