import "next-auth";

// In TypeScript, if you just write declare module "next-auth" without importing it first, TS sometimes treats your declaration as replacing the module’s types instead of merging with them.
// In NextAuth v5, the default export is an object, not a callable function.
// Without the proper merge, TS lost the “callable signature” information, so it complained when you tried NextAuth({...}).
// Fix: Add import "next-auth"; at the top of the file:
declare module "next-auth"{//declaring a new typescript module whose name is "next-auth"
    interface Session extends Session{
        id: string
    }
    // #####################################################################################. interface to interface->extend, interface to class->implement, class to class->extent.
    // since the callback's session has Session type, so it extends the interface that i defined in THIS type declaration file
    interface JWT extends JWT {
        id: string
    }
    //SAMEWITH JWT.
}