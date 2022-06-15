import { useRef } from "react";
import { useHMSActions } from "@100mslive/react-sdk";

export default function JoinForm() {
  const hmsActions = useHMSActions();
  const nameRef = useRef();

  const getToken = async (user_id) => {
    const response = await fetch(process.env.REACT_APP_GENERATE_TOKEN_API, {
      method: "POST",
      body: JSON.stringify({
        user_id,
        role: "new-role-3368",
        type: "app",
        room_id: process.env.REACT_APP_ROOM_ID,
      }),
    });

    const { token } = await response.json();
    return token;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getToken(nameRef.current.value);
    hmsActions.join({
      userName: nameRef.current.value,
      authToken: token,
    });
  };

  return (
    <div className="form-wrapper flex-center">
      <h2>Join Room</h2>
      <form onSubmit={handleSubmit}>
        <input
          ref={nameRef}
          type="text"
          id="name"
          name="name"
          placeholder="Your Name"
        />
        <button>Join</button>
      </form>
    </div>
  );
}
