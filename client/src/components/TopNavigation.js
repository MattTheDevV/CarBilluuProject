import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function TopNavBar() {
    return ( 
        <Navbar style={{boxShadow: "0px 35px 88px -28px rgba(0,0,0,0.40)"}}>
          <Container style={{maxWidth: "800px"}}>
            <Navbar.Brand href="/">
              <span style={{color:"#198ef7", fontWeight: "bold", fontSize: "xx-large"}}>
                Car
              </span>
              <span style={{color:"#494949", fontWeight: "bold", fontSize: "xx-large"}}>
                Bill
              </span>
            </Navbar.Brand>
          </Container>
        </Navbar>
    );
}

export default TopNavBar;