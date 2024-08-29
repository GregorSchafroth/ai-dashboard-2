import { SignIn } from "@clerk/nextjs"

const SignInPage = () => {
  return (
    <div className="flex justify-center mt-6">
     <SignIn />
    </div>
  )
}

export default SignInPage