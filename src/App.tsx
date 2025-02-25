import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [selectedCountry, setSelectedCountry] = useState('NL')
  const [countries, setCountries] = useState<{isoCode: string, name: {text: string}[]}[]>([])
  const [countryHolidays, setCountryHolidays] = useState<{startDate: string, name: {text: string}[]}[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const resp = await fetch(`https://openholidaysapi.org/Countries?languageIsoCode=en`)
        const data = await resp.json()

        setCountries(data)

        console.log(data)
      } catch (error) {
        console.error('Error fetching countries:', error)
      }
    }

    fetchCountries()

  }, [])

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const resp = await fetch(`https://openholidaysapi.org/PublicHolidays?countryIsoCode=${selectedCountry}&validFrom=2025-01-01&validTo=2025-12-31&languageIsoCode=en`)
        const data = await resp.json()

        setCountryHolidays(data)

        console.log(data)
      } catch (error) {
        console.error('Error fetching holidays:', error)
      }
    }
    fetchHolidays()
  }, [selectedCountry])

  const handleChangeCountry = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value)
  }

  return (
    <>
      <div>
        <h1>Public Holidays</h1>
        <select id="country" name="country" 
          value={selectedCountry}
          onChange={handleChangeCountry}
        >
          {countries.map((country) => {
            return (
              <option key={country.isoCode} value={country.isoCode} >
                {country.name[0] && country.name[0].text}
              </option>
            )}
          )}
        </select>

        <ul className="holidays">
          {countryHolidays.map((holiday) => {
            return (
              <li key={crypto.randomUUID()}>
                <p>{holiday.startDate} <strong>{holiday.name[0] && holiday.name[0].text}</strong></p>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default App
