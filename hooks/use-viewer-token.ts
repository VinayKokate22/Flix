import { createViewerToken } from "@/actions/token";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { JwtPayload, jwtDecode } from "jwt-decode";
export const useViewerToken = (hostIndentity: string) => {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [identity, setIdentity] = useState("");

  useEffect(() => {
    const createToken = async () => {
      try {
        const viewerToken = await createViewerToken(hostIndentity);
        setToken(viewerToken);

        const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
          name?: string;
        };
        const name = decodedToken?.name;
        const identity = decodedToken.jti;

        if (identity) {
          setIdentity(identity);
        }
        if (name) {
          setName(name);
        }
      } catch {
        toast.error("Something went wrong");
      }
    };
    createToken();
  }, [hostIndentity]);

  return {
    token,
    name,
    identity,
  };
};
