import Container from '@/components/container'
import ThemeSwitch from '@/components/themeSwitch'

export default function Footer(props) {
  return (
    <Container className="mt-10 border-t border-gray-100 dark:border-gray-800">
      <div className="text-center text-sm text-bbq-charcoal dark:text-white">
        {props?.copyright}
      </div>
      <div className="mt-2 flex items-center justify-end w-full">
        <ThemeSwitch />
      </div>
    </Container>
  )
}
