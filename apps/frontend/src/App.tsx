import "./App.css";

function App() {
  let count = 0;
  const handleClick = async () => {
    fetch("http://localhost:3000")
      .then((response: Response) => response.json())
      .then((data) => {
        console.log(data);

        count++;
        const mainHeading = document.getElementById("main-heading");
        if (mainHeading) {
          const newParagraph = document.createElement("p");
          newParagraph.textContent = JSON.stringify(data) + ` ${count}`; // Convert object to string
          mainHeading.appendChild(newParagraph);
        }
      })
      .catch((error: Error) => {
        console.log(error);
      });
  };
 
  // const handleClick = async (e: any) => {
  //   try {
  //     const response = await fetch("http://localhost:3000", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     // Await the JSON parsing
  //     const data = await response.json();

  //     // Log the response data
  //     console.log(data);

  //     // Example: Dynamically update the DOM
  //     const mainHeading = document.getElementById("main-heading");
  //     if (mainHeading) {
  //       const newParagraph = document.createElement("p");
  //       newParagraph.textContent = JSON.stringify(data); // Convert object to string
  //       mainHeading.appendChild(newParagraph);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // const handleClick = (e: any) => {
  //   fetch("http://localhost:3000", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => response.json()) // Parse JSON
  //     .then((data) => {
  //       console.log(data);

  //       // Example: Dynamically update the DOM
  //       const mainHeading = document.getElementById("main-heading");
  //       if (mainHeading) {
  //         const newParagraph = document.createElement("p");
  //         newParagraph.textContent = JSON.stringify(data); // Convert object to string
  //         mainHeading.appendChild(newParagraph);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // };

  
  return (
    <h1 id="main-heading">
      <button onClick={handleClick}>Click Me</button>
    </h1>
  );
}

export default App;