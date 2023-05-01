import styles from "../../styles/Home.module.css";

function FeatureItem({ title, text, iconName }) {
  return (
    <div className="relative pl-16">
      <dt className="text-base font-semibold leading-7 text-gray-900">
        <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
          <span className={` material-symbols-outlined`} style={{ color: "white" }}>
            {iconName}
          </span>
        </div>
        {title}
      </dt>
      <dd className="mt-2 text-base leading-7 text-gray-600">{text}</dd>
    </div>
  );
}

function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Добро пожаловать в приложение BetterSave</h1>
        <p className={`${styles.description} font-bold  underline md:text-3xl`}>Мы очень рады вас видеть. Снова</p>

        {/* <div className={styles.grid}> */}
        <div className="bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              {/* <h2 className="text-base font-semibold leading-7 text-indigo-600">Мяу мяу</h2> */}
              <p className="mt-2 text-center text-base font-bold tracking-tight text-gray-900 sm:text-4xl md:text-3xl">
                Узнайте больше о возможностях BetterSave
              </p>
              {/* <p className="mt-6 text-lg leading-8 text-gray-600">
                Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum
                pulvinar et feugiat blandit at. In mi viverra elit nunc.
              </p> */}
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                <FeatureItem
                  title="Долги и займы"
                  text="Храните информацию о своих долгах и должниках, отслеживайте сроки возвращения долгов"
                  iconName="today"
                />
                <FeatureItem
                  title="Цели"
                  text="Ставьте цели по тратам и поступлениям, получайте информацию об их достижении"
                  iconName="celebration"
                />
                <FeatureItem
                  title="Разбивка"
                  text="Разбивайте сумму транзакций на компанию. Разобраться, кто сколько должен, теперь гораздо проще"
                  iconName="safety_divider"
                />
                <FeatureItem
                  title="Категории"
                  text="Создавайте свои категории трат или используйте готовые"
                  iconName="category"
                />
              </dl>
            </div>
          </div>
          {/* </div> */}
        </div>
      </main>
    </div>
  );
}

export default Home;
