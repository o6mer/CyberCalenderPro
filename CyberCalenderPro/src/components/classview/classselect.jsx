import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext.jsx";
import Container from "@mui/material/Container";
import CardClass from "./classcard.jsx";
import NavBar from "./navbar.jsx";

export default function ClassView() {
  const { classesData } = useContext(UserContext);

  return (
    <>
      <NavBar />
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        {classesData.map((singleClass, index) => {
          return (
            <CardClass
              key={index}
              name={singleClass.className}
              capacity={singleClass.capacity}
              values={singleClass}
            />
          );
        })}
      </Container>
    </>
  );
}
