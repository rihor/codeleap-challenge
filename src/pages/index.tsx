import { useRouter } from "next/navigation"
import { useAppSelector } from "~/redux/hooks"

export default function MainPage() {
  const username = useAppSelector((state) => state.user.name)
  const router = useRouter()

  if (username?.length === 0) {
    router.replace("/signup")
    return <>Redirecting...</>
  }

  return <>Main Page</>
}
