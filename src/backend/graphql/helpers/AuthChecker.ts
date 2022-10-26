import { ContextType } from "@/src/backend/graphql/resources/ContextType";
import { AuthChecker } from "type-graphql";

export const customAuthChecker: AuthChecker<ContextType> = (
  { root, args, context, info },
  roles
) => {
  // console.log({ root });
  // console.log({ args });
  // console.log({ context });
  // console.log({ info });
  // console.log({ roles });

  return true; // or false if access is denied
};
