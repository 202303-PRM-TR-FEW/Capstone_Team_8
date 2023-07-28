import Link from "next-intl/link";
import { useTranslations, useLocale } from "next-intl";

export default function Foooter() {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <footer className=" relative  bg-gray-100 rounded shadow  mt-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            href="/"
            locale={locale}
            className="flex items-center mb-4 sm:mb-0"
          >
            <span className="self-center text-2xl font-bold whitespace-nowrap ">
              Givingly
            </span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 ">
            <li>
              <Link
                href="/projects"
                locale={locale}
                className="mr-4 hover:underline md:mr-6 "
              >
                {t("Home")}
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                locale={locale}
                className="mr-4 hover:underline md:mr-6"
              >
                {t("about_link")}
              </Link>
            </li>
            <li>
              <Link
                href="/contributors"
                locale={locale}
                className="mr-4 hover:underline md:mr-6 "
              >
                {t("contributors")}
              </Link>
            </li>
            <li>
              <Link href="/faq" locale={locale} className="hover:underline">
                {t("faq")}
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023 . {t("reserved")}.
        </span>
      </div>
    </footer>
  );
}
