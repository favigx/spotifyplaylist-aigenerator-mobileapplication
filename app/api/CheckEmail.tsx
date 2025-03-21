const checkEmail = async (email: string) => {
    try {
      const response = await fetch(
        `https://sea-turtle-app-le797.ondigitalocean.app/check-email/${encodeURIComponent(email)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.ok) {
        return true; 
      } else {
        const errorMessage = await response.text(); 
        throw new Error(errorMessage);
      }
    } catch (error) {
      throw error;
    }
  };
  
  export default checkEmail;
