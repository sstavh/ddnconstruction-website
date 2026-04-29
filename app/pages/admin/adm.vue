<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'

const apiUrl = useRuntimeConfig().public.apiUrl || 'http://127.0.0.1:3001'

const login = ref('')
const password = ref('')
const loginError = ref('')
const loggedIn = ref(false)
const activeSection = ref<string>('')

const sections = [
  { key: 'reviewsbd', label: 'Відгуки', instruction: 'У цьому розділі можна переглядати та керувати відгуками.' },
  { key: 'pep', label: 'Форма звернення', instruction: 'Це розділ заявок PEP. Тут показуються ліди з форми.' },
  { key: 'pa', label: 'Прайс', instruction: 'Це адмін-розділ управління категоріями прайсу PA.' },
  { key: 'pricing', label: 'Прайс огляд', instruction: 'Показує прайс-каталог з API.' },
  { key: 'calAF', label: 'Калькулятор Форми', instruction: 'Це розділ для заявок калькулятора.' },
  { key: 'calA', label: 'Калькулятор Прайсу', instruction: 'Адмінська панель для прайсу калькулятора.' },
  { key: 'discounts', label: 'Знижки', instruction: 'Встановіть знижку у відсотках на конкретний товар калькулятора.' },
  { key: 'difficulties', label: 'Вимикач секцій', instruction: 'Редагуйте імена та спеціальності працівників. Вмикайте/вимикайте секцію DirectorMes.' },
  { key: 'icons', label: 'Іконки', instruction: 'Виберіть 5 іконок для головної сторінки.' },
  { key: 'fotoAdm', label: 'Фото / Медіа', instruction: 'Перейти до панелі керування фото, логотипом та медіа.', isLink: true, href: '/fotoAdm' },
  { key: 'logout', label: 'Вийти', instruction: 'Натисніть, щоб вийти з адмінки.', isLogout: true },
]
// --- ICONS ---
import { onBeforeMount } from 'vue'
const iconFiles = ref<string[]>([])
type IconValue = string | { name: string, url: string, file: File }
const selectedIcons = ref<IconValue[]>(['', '', '', '', ''])
const iconsLoading = ref(false)
const iconsError = ref('')

const fetchIcons = async () => {
  iconsLoading.value = true
  iconsError.value = ''
  try {
    // Список іконок жорстко, бо assets не доступні через fetch
    iconFiles.value = [
      'free-icon-badge-9285758.png',
      'free-icon-deadline-8664666.png',
      'free-icon-no-hidden-charges-10135467.png',
      'free-icon-premium-quality-4212243.png',
      'free-icon-specialist-user-80886.png',
    ]
  } catch (e) {
    iconsError.value = 'Не вдалося завантажити іконки'
  } finally {
    iconsLoading.value = false
  }
}


const saveIcons = () => {
  // Тут можна додати API-запит для збереження
  // selectedIcons.value містить або string (ім'я з assets), або {name, url, file} для кастомних
  alert('Іконки збережено! (зараз лише локально)')
}

function handleIconFileChange(e: Event, idx: number) {
  const input = e.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    const reader = new FileReader()
    reader.onload = (ev) => {
      selectedIcons.value[idx] = {
        name: file.name,
        url: ev.target?.result as string,
        file
      }
    }
    reader.readAsDataURL(file)
  }
}

onBeforeMount(() => {
  fetchIcons()
})

const activeInstruction = computed(() => {
  const section = sections.find((section) => section.key === activeSection.value)
  return section?.instruction ?? 'Виберіть розділ, щоб побачити інструкцію.'
})

const isClient = typeof window !== 'undefined'

const checkSavedLogin = () => {
  if (isClient) {
    loggedIn.value = localStorage.getItem('adminLogged') === 'true'
  }
}

const submitLogin = async () => {
  try {
    loginError.value = ''
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: login.value, password: password.value }),
    })

    if (!response.ok) {
      throw new Error('Невірний логін або пароль')
    }

    const result = await response.json()
    if (!result?.success) {
      throw new Error('Невірний логін або пароль')
    }

    loggedIn.value = true
    if (isClient) {
      localStorage.setItem('adminLogged', 'true')
    }
    activeSection.value = ''
  } catch (error: any) {
    loginError.value = error?.message ?? 'Невірний логін або пароль'
  }
}

const logout = () => {
  loggedIn.value = false
  activeSection.value = ''
  login.value = ''
  password.value = ''
  if (isClient) {
    localStorage.removeItem('adminLogged')
  }
}

const selectSection = async (sectionKey: string) => {
  const section = sections.find((section) => section.key === sectionKey)
  if (!section) return

  if (section.isLogout) {
    logout()
    return
  }

  if (section.isLink && section.href) {
    navigateTo(section.href)
    return
  }

  activeSection.value = sectionKey
  if (sectionKey === 'reviewsbd') {
    await loadReviews()
  } else if (sectionKey === 'pep') {
    await loadPepLeads()
  } else if (sectionKey === 'pricing') {
    await loadPricing()
  } else if (sectionKey === 'calAF') {
    await loadCalLeads()
  } else if (sectionKey === 'pa') {
    await loadPaCategories()
  } else if (sectionKey === 'calA') {
    await loadCalACategories()
  } else if (sectionKey === 'discounts') {
    await loadGlobalDiscount()
  } else if (sectionKey === 'difficulties') {
    await loadDifficulties()
  } else if (sectionKey === 'icons') {
    await fetchIcons()
  }
}

onMounted(checkSavedLogin)

/* ReviewsBD */
type Review = {
  id: number
  firstName?: string
  lastName?: string
  rating: number
  message: string
  photo?: string
  createdAt?: string
}

const reviews = ref<Review[]>([])
const reviewsLoading = ref(false)
const reviewsError = ref<string | null>(null)
const deletingReviewId = ref<number | null>(null)

const loadReviews = async () => {
  try {
    reviewsLoading.value = true
    reviewsError.value = null
    const res = await fetch(`${apiUrl}/reviews`)
    if (!res.ok) throw new Error(`Failed to load reviews: ${res.status}`)
    const data = await res.json()
    const rawReviews = Array.isArray(data) ? data : Array.isArray(data?.reviews) ? data.reviews : []
    reviews.value = rawReviews
      .map((item: any) => ({
        id: Number(item.id) || 0,
        firstName: item.firstName ?? item.first_name ?? '',
        lastName: item.lastName ?? item.last_name ?? '',
        rating: Number(item.rating) || 0,
        message: item.message ?? item.text ?? '',
        photo: item.photo ?? '',
        createdAt: item.createdAt ?? item.created_at ?? '',
      }))
      .sort((a: Review, b: Review) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
        return dateB - dateA
      })
  } catch (error: any) {
    reviewsError.value = error?.message || 'Не вдалося завантажити відгуки'
  } finally {
    reviewsLoading.value = false
  }
}

const deleteReview = async (id: number) => {
  if (!confirm('Видалити цей відгук?')) return

  try {
    deletingReviewId.value = id
    const res = await fetch(`${apiUrl}/reviews/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error(`Failed to delete review: ${res.status}`)
    reviews.value = reviews.value.filter((review) => review.id !== id)
  } catch (error) {
    alert('Не вдалося видалити відгук')
  } finally {
    deletingReviewId.value = null
  }
}

/* PEP */
const pepLeads = ref<any[]>([])
const pepLoading = ref(false)
const pepError = ref<string | null>(null)

const loadPepLeads = async () => {
  try {
    pepLoading.value = true
    pepError.value = null
    const res = await fetch(`${apiUrl}/leads`)
    if (!res.ok) throw new Error(`Failed to load leads: ${res.status}`)
    pepLeads.value = await res.json()
  } catch (error: any) {
    pepError.value = error?.message || 'Не вдалося завантажити заявки'
  } finally {
    pepLoading.value = false
  }
}

/* Pricing */
type PricingItem = {
  id: number
  title: string
  titleUk: string
  price: string
  priceType?: 'fixed' | 'm2'
}

type PricingCategory = {
  id: string
  title: string
  description: string
  items: PricingItem[]
}

const pricingData = ref<PricingCategory[]>([])
const activePricingId = ref('')
const pricingLoading = ref(false)
const pricingError = ref<string | null>(null)

const loadPricing = async () => {
  try {
    pricingLoading.value = true
    pricingError.value = null
    const res = await fetch(`${apiUrl}/pricing`)
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
    pricingData.value = await res.json()
    if (pricingData.value.length > 0 && !activePricingId.value) {
      const firstCategory = pricingData.value[0]
      if (firstCategory) {
        activePricingId.value = firstCategory.id
      }
    }
  } catch (error: any) {
    pricingError.value = error?.message || 'Помилка завантаження прайсу'
  } finally {
    pricingLoading.value = false
  }
}

const activePricingCategory = computed(() =>
  pricingData.value.find((category) => category.id === activePricingId.value),
)

/* calAF */
type CalculatorLead = {
  id: number
  name: string
  phone: string
  email?: string
  comment?: string
  roomCount: number
  selectedRooms: string[]
  servicesByRoom: Record<string, string[]>
  areasByRoom: Record<string, number>
  createdAt: string
}

const calLeads = ref<CalculatorLead[]>([])
const calLoading = ref(false)
const calError = ref('')

const loadCalLeads = async () => {
  try {
    calLoading.value = true
    calError.value = ''
    const response = await fetch(`${apiUrl}/calculator-leads`)
    if (!response.ok) throw new Error('Не вдалося завантажити заявки')
    calLeads.value = await response.json()
  } catch (error: any) {
    calError.value = error.message || 'Помилка завантаження заявок'
  } finally {
    calLoading.value = false
  }
}

const formatServices = (servicesByRoom: Record<string, string[]>) =>
  Object.entries(servicesByRoom)
    .map(([room, services]) => `${room}: ${services.join(', ')}`)
    .join(' | ')

const formatAreas = (areasByRoom: Record<string, number>) =>
  Object.entries(areasByRoom)
    .map(([room, area]) => `${room}: ${area} м²`)
    .join(' | ')

/* PA admin */
const paCategories = ref<PricingCategory[]>([])
const selectedPaCategoryId = ref('')
const paLoading = ref(false)
const paError = ref('')

const categoryForm = reactive({ id: '', title: '', description: '' })
const itemForm = reactive({ categoryId: '', title: '', titleUk: '', price: '' })

const loadPaCategories = async () => {
  try {
    paLoading.value = true
    paError.value = ''
    const response = await fetch(`${apiUrl}/pricing`)
    if (!response.ok) throw new Error('Не вдалося завантажити категорії')
    paCategories.value = await response.json()
    if (!selectedPaCategoryId.value && paCategories.value.length > 0) {
      const firstCategory = paCategories.value[0]
      if (firstCategory) {
        selectedPaCategoryId.value = firstCategory.id
        itemForm.categoryId = firstCategory.id
      }
    }
  } catch (error: any) {
    paError.value = error.message || 'Помилка завантаження категорій'
  } finally {
    paLoading.value = false
  }
}

const createPaCategory = async () => {
  if (!categoryForm.id || !categoryForm.title || !categoryForm.description) {
    paError.value = 'Заповніть всі поля категорії'
    return
  }

  paLoading.value = true
  paError.value = ''

  try {
    const response = await fetch(`${apiUrl}/pricing/category`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(categoryForm),
    })
    if (!response.ok) throw new Error('Не вдалося створити категорію')
    const created = await response.json()
    paCategories.value.push({ ...created, items: [] })
    selectedPaCategoryId.value = created.id
    itemForm.categoryId = created.id
    categoryForm.id = ''
    categoryForm.title = ''
    categoryForm.description = ''
  } catch (error: any) {
    paError.value = error.message || 'Помилка створення категорії'
  } finally {
    paLoading.value = false
  }
}

const deletePaCategory = async (id: string) => {
  if (!confirm('Видалити категорію?')) return
  paLoading.value = true
  paError.value = ''

  try {
    const response = await fetch(`${apiUrl}/pricing/category/${id}`, { method: 'DELETE' })
    if (!response.ok) throw new Error('Не вдалося видалити категорію')
    paCategories.value = paCategories.value.filter((category) => category.id !== id)
    if (selectedPaCategoryId.value === id) {
      selectedPaCategoryId.value = paCategories.value[0]?.id ?? ''
      itemForm.categoryId = selectedPaCategoryId.value
    }
  } catch (error: any) {
    paError.value = error.message || 'Помилка видалення категорії'
  } finally {
    paLoading.value = false
  }
}

const createPaItem = async () => {
  if (!itemForm.categoryId || !itemForm.title || !itemForm.titleUk || !itemForm.price) {
    paError.value = 'Заповніть всі поля елемента'
    return
  }

  paLoading.value = true
  paError.value = ''

  try {
    const response = await fetch(`${apiUrl}/pricing/item`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(itemForm),
    })
    if (!response.ok) throw new Error('Не вдалося створити елемент')
    const created = await response.json()
    const category = paCategories.value.find((category) => category.id === created.categoryId)
    if (category) category.items.push(created)
    itemForm.title = ''
    itemForm.titleUk = ''
    itemForm.price = ''
  } catch (error: any) {
    paError.value = error.message || 'Помилка створення елемента'
  } finally {
    paLoading.value = false
  }
}

const deletePaItem = async (id: number) => {
  if (!confirm('Видалити елемент прайсу?')) return

  paLoading.value = true
  paError.value = ''
  try {
    const response = await fetch(`${apiUrl}/pricing/item/${id}`, { method: 'DELETE' })
    if (!response.ok) throw new Error('Не вдалося видалити елемент')
    paCategories.value = paCategories.value.map((category) => ({
      ...category,
      items: category.items.filter((item) => item.id !== id),
    }))
  } catch (error: any) {
    paError.value = error.message || 'Помилка видалення елемента'
  } finally {
    paLoading.value = false
  }
}

/* calA admin */
const calACategories = ref<PricingCategory[]>([])
const selectedCalAId = ref('')
const calALoading = ref(false)
const calAError = ref('')

const calACategoryForm = reactive({ id: '', title: '', description: '' })
const calAItemForm = reactive({ categoryId: '', title: '', titleUk: '', price: '', priceType: 'fixed' })

const loadCalACategories = async () => {
  try {
    calALoading.value = true
    calAError.value = ''
    const response = await fetch(`${apiUrl}/pricing`)
    if (!response.ok) throw new Error('Не вдалося завантажити категорії')
    calACategories.value = await response.json()
    if (!selectedCalAId.value && calACategories.value.length > 0) {
      const firstCategory = calACategories.value[0]
      if (firstCategory) {
        selectedCalAId.value = firstCategory.id
        calAItemForm.categoryId = firstCategory.id
      }
    }
  } catch (error: any) {
    calAError.value = error.message || 'Помилка завантаження категорій'
  } finally {
    calALoading.value = false
  }
}

const createCalACategory = async () => {
  if (!calACategoryForm.id || !calACategoryForm.title || !calACategoryForm.description) {
    calAError.value = 'Заповніть всі поля категорії'
    return
  }

  calALoading.value = true
  calAError.value = ''

  try {
    const response = await fetch(`${apiUrl}/pricing/category`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(calACategoryForm),
    })
    if (!response.ok) throw new Error('Не вдалося створити категорію')
    const created = await response.json()
    calACategories.value.push({ ...created, items: [] })
    selectedCalAId.value = created.id
    calAItemForm.categoryId = created.id
    calACategoryForm.id = ''
    calACategoryForm.title = ''
    calACategoryForm.description = ''
  } catch (error: any) {
    calAError.value = error.message || 'Помилка створення категорії'
  } finally {
    calALoading.value = false
  }
}

const deleteCalACategory = async (id: string) => {
  if (!confirm('Видалити категорію?')) return
  calALoading.value = true
  calAError.value = ''

  try {
    const response = await fetch(`${apiUrl}/pricing/category/${id}`, { method: 'DELETE' })
    if (!response.ok) throw new Error('Не вдалося видалити категорію')
    calACategories.value = calACategories.value.filter((category) => category.id !== id)
    if (selectedCalAId.value === id) {
      selectedCalAId.value = calACategories.value[0]?.id ?? ''
      calAItemForm.categoryId = selectedCalAId.value
    }
  } catch (error: any) {
    calAError.value = error.message || 'Помилка видалення категорії'
  } finally {
    calALoading.value = false
  }
}

const createCalAItem = async () => {
  if (!calAItemForm.categoryId || !calAItemForm.title || !calAItemForm.titleUk || !calAItemForm.price) {
    calAError.value = 'Заповніть всі поля для елемента'
    return
  }

  calALoading.value = true
  calAError.value = ''

  try {
    const response = await fetch(`${apiUrl}/pricing/item`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(calAItemForm),
    })
    if (!response.ok) throw new Error('Не вдалося створити елемент')
    const created = await response.json()
    const category = calACategories.value.find((category) => category.id === created.categoryId)
    if (category) category.items.push(created)
    calAItemForm.title = ''
    calAItemForm.titleUk = ''
    calAItemForm.price = ''
    calAItemForm.priceType = 'fixed'
  } catch (error: any) {
    calAError.value = error.message || 'Помилка створення елемента'
  } finally {
    calALoading.value = false
  }
}

const deleteCalAItem = async (id: number) => {
  if (!confirm('Видалити елемент?')) return
  calALoading.value = true
  calAError.value = ''

  try {
    const response = await fetch(`${apiUrl}/pricing/item/${id}`, { method: 'DELETE' })
    if (!response.ok) throw new Error('Не вдалося видалити елемент')
    calACategories.value = calACategories.value.map((category) => ({
      ...category,
      items: category.items.filter((item) => item.id !== id),
    }))
  } catch (error: any) {
    calAError.value = error.message || 'Помилка видалення елемента'
  } finally {
    calALoading.value = false
  }
}

/* Discounts */
const globalDiscount = ref(0)
const discountLoading = ref(false)
const discountError = ref('')
const discountPercent = ref(0)

const loadGlobalDiscount = async () => {
  try {
    discountLoading.value = true
    discountError.value = ''
    const res = await fetch(`${apiUrl}/discounts/global`)
    if (!res.ok) throw new Error('Не вдалося завантажити знижку')
    const val = await res.json()
    globalDiscount.value = typeof val === 'number' ? val : 0
    discountPercent.value = globalDiscount.value
  } catch (error: any) {
    discountError.value = error.message || 'Помилка завантаження знижки'
  } finally {
    discountLoading.value = false
  }
}

const saveGlobalDiscount = async () => {
  if (discountPercent.value < 0 || discountPercent.value > 99) {
    discountError.value = 'Відсоток від 0 до 99'
    return
  }
  discountLoading.value = true
  discountError.value = ''
  try {
    const res = await fetch(`${apiUrl}/discounts/global`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ percent: Number(discountPercent.value) }),
    })
    if (!res.ok) throw new Error('Не вдалося зберегти знижку')
    globalDiscount.value = discountPercent.value
  } catch (error: any) {
    discountError.value = error.message || 'Помилка збереження знижки'
  } finally {
    discountLoading.value = false
  }
}

const clearGlobalDiscount = async () => {
  discountLoading.value = true
  discountError.value = ''
  try {
    const res = await fetch(`${apiUrl}/discounts/global`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Не вдалося прибрати знижку')
    globalDiscount.value = 0
    discountPercent.value = 0
  } catch (error: any) {
    discountError.value = error.message || 'Помилка видалення знижки'
  } finally {
    discountLoading.value = false
  }
}

/* Difficulties workers + DirectorMes toggle */
type DiffWorker = { id: number | null; name: string; specialty: string }
const diffWorkers = ref<[DiffWorker, DiffWorker, DiffWorker]>([
  { id: null, name: '', specialty: '' },
  { id: null, name: '', specialty: '' },
  { id: null, name: '', specialty: '' },
])
const directorMesVisible = ref(true)
const directorMesRecordId = ref<number | null>(null)
const workersVisible = ref(true)
const workersRecordId = ref<number | null>(null)
const diffLoading = ref(false)
const diffError = ref('')
const diffSaved = ref(false)

async function loadToggle(section: string): Promise<{ id: number | null; visible: boolean }> {
  try {
    const res = await fetch(`${apiUrl}/section-images/section/${section}`)
    const data = await res.json()
    if (data?.length > 0) return { id: data[0].id, visible: data[0].title !== '0' }
  } catch {}
  return { id: null, visible: true }
}

async function saveToggle(recordId: number | null, section: string, visible: boolean): Promise<number | null> {
  const body = JSON.stringify({ section, imageUrl: '', title: visible ? '1' : '0', isActive: true, order: 0 })
  const headers = { 'Content-Type': 'application/json' }
  try {
    if (recordId) {
      const res = await fetch(`${apiUrl}/section-images/${recordId}`, { method: 'PUT', headers, body })
      if (!res.ok) throw new Error(`PUT failed: ${res.status}`)
      return recordId
    } else {
      const res = await fetch(`${apiUrl}/section-images`, { method: 'POST', headers, body })
      if (!res.ok) throw new Error(`POST failed: ${res.status}`)
      const d = await res.json()
      return d.id ?? null
    }
  } catch (e: any) {
    diffError.value = e?.message || 'Помилка збереження'
  }
  return null
}

const loadDifficulties = async () => {
  diffLoading.value = true
  diffError.value = ''
  diffSaved.value = false
  try {
    const sections = ['difficulties1', 'difficulties2', 'difficulties3']
    const [results, dm, wv] = await Promise.all([
      Promise.all(sections.map((s) => fetch(`${apiUrl}/section-images/section/${s}`).then((r) => r.json()))),
      loadToggle('directorMesVisible'),
      loadToggle('difficultiesWorkersVisible'),
    ])
    results.forEach((data, i) => {
      if (data?.length > 0) {
        diffWorkers.value[i] = { id: data[0].id, name: data[0].title || '', specialty: data[0].description || '' }
      }
    })
    directorMesRecordId.value = dm.id
    directorMesVisible.value = dm.visible
    workersRecordId.value = wv.id
    workersVisible.value = wv.visible
  } catch (e: any) {
    diffError.value = e.message || 'Помилка завантаження'
  } finally {
    diffLoading.value = false
  }
}

const saveDiffWorker = async (idx: 0 | 1 | 2) => {
  const worker = diffWorkers.value[idx]
  diffError.value = ''
  const sectionName = `difficulties${idx + 1}`
  try {
    if (worker.id) {
      await fetch(`${apiUrl}/section-images/${worker.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: sectionName, title: worker.name, description: worker.specialty }),
      })
    } else {
      const res = await fetch(`${apiUrl}/section-images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: sectionName, imageUrl: '', title: worker.name, description: worker.specialty, isActive: true, order: 0 }),
      })
      const created = await res.json()
      diffWorkers.value[idx].id = created.id
    }
    diffSaved.value = true
    setTimeout(() => { diffSaved.value = false }, 2000)
  } catch (e: any) {
    diffError.value = e.message || 'Помилка збереження'
  }
}

const saveDirectorMesToggle = async () => {
  diffError.value = ''
  const id = await saveToggle(directorMesRecordId.value, 'directorMesVisible', directorMesVisible.value)
  if (!diffError.value) {
    if (id !== null) directorMesRecordId.value = id
    diffSaved.value = true
    setTimeout(() => { diffSaved.value = false }, 2000)
  }
}

const saveWorkersToggle = async () => {
  diffError.value = ''
  const id = await saveToggle(workersRecordId.value, 'difficultiesWorkersVisible', workersVisible.value)
  if (!diffError.value) {
    if (id !== null) workersRecordId.value = id
    diffSaved.value = true
    setTimeout(() => { diffSaved.value = false }, 2000)
  }
}
</script>

<template>
  <section class="admin-login-page">
    <div class="admin-panel admin-panel--wide">
      <h1>Адмінка</h1>

      <div v-if="!loggedIn" class="login-box">
        <p>Увійдіть як адміністратор, щоб керувати розділами прямо на цій сторінці.</p>
        <label>
          Логін
          <input v-model="login" type="text" autocomplete="username" />
        </label>
        <label>
          Пароль
          <input v-model="password" type="password" autocomplete="current-password" />
        </label>
        <button class="login-btn" @click.prevent="submitLogin">Увійти</button>
        <p v-if="loginError" class="error-text">{{ loginError }}</p>
      </div>

      <div v-else class="admin-content">
        <div class="admin-top-row">
          <p class="success-text">Ви успішно увійшли в адмінку.</p>
          <button class="logout-btn" @click="logout">Вийти</button>
        </div>

        <div class="buttons-grid">
          <button
            v-for="section in sections"
            :key="section.key"
            :class="['admin-button', { logout: section.isLogout, link: section.isLink }]"
            @click="selectSection(section.key)"
          >
            {{ section.label }}
          </button>
        </div>

        <div class="instruction-box">
          <h2>Інструкція</h2>
          <p>{{ activeInstruction }}</p>
        </div>

        <div class="content-section" v-if="activeSection === 'reviewsbd'">
          <div class="section-header">
            <h2>ReviewsBD</h2>
            <button class="small-btn" @click="loadReviews">Оновити відгуки</button>
          </div>
          <div v-if="reviewsLoading" class="status">Завантаження...</div>
          <div v-if="reviewsError" class="error">{{ reviewsError }}</div>
          <table v-if="!reviewsLoading && !reviewsError" class="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Ім'я</th>
                <th>Прізвище</th>
                <th>Оцінка</th>
                <th>Текст</th>
                <th>Фото</th>
                <th>Дата</th>
                <th>Дії</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="reviews.length === 0">
                <td colspan="8">Відгуків поки немає</td>
              </tr>
              <tr v-for="review in reviews" :key="review.id">
                <td>{{ review.id }}</td>
                <td>{{ review.firstName || '—' }}</td>
                <td>{{ review.lastName || '—' }}</td>
                <td>{{ review.rating }}</td>
                <td>{{ review.message || '—' }}</td>
                <td>
                  <img
                    v-if="review.photo"
                    :src="review.photo.startsWith('http') ? review.photo : `${apiUrl}/${String(review.photo).replace(/^\/+/, '')}`"
                    alt="photo"
                    class="thumb"
                  />
                  <span v-else>—</span>
                </td>
                <td>{{ review.createdAt ? new Date(review.createdAt).toLocaleString() : '—' }}</td>
                <td>
                  <button class="small-btn danger" :disabled="deletingReviewId === review.id" @click="deleteReview(review.id)">
                    {{ deletingReviewId === review.id ? 'Видалення...' : 'Видалити' }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="content-section" v-if="activeSection === 'pep'">
          <div class="section-header">
            <h2>PEP заявки</h2>
            <button class="small-btn" @click="loadPepLeads">Оновити заявки</button>
          </div>
          <div v-if="pepLoading" class="status">Завантаження...</div>
          <div v-if="pepError" class="error">{{ pepError }}</div>
          <table v-if="!pepLoading && !pepError" class="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Ім'я</th>
                <th>Прізвище</th>
                <th>Email</th>
                <th>Телефон</th>
                <th>Роботи</th>
                <th>Області</th>
                <th>Коментар</th>
                <th>Дата</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="pepLeads.length === 0">
                <td colspan="9">Заявок поки немає</td>
              </tr>
              <tr v-for="lead in pepLeads" :key="lead.id">
                <td>{{ lead.id }}</td>
                <td>{{ lead.firstName || '—' }}</td>
                <td>{{ lead.lastName || '—' }}</td>
                <td>{{ lead.email || '—' }}</td>
                <td>{{ lead.phone || '—' }}</td>
                <td>{{ lead.jobs?.join(', ') ?? '' }}</td>
                <td>{{ typeof lead.areas === 'string' ? lead.areas : JSON.stringify(lead.areas) }}</td>
                <td>{{ lead.comment || '—' }}</td>
                <td>{{ lead.createdAt ? new Date(lead.createdAt).toLocaleString() : '—' }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="content-section" v-if="activeSection === 'pricing'">
          <div class="section-header">
            <h2>Pricing</h2>
            <button class="small-btn" @click="loadPricing">Оновити прайс</button>
          </div>
          <div v-if="pricingLoading" class="status">Завантаження...</div>
          <div v-if="pricingError" class="error">{{ pricingError }}</div>
          <div v-if="!pricingLoading && !pricingError" class="pricing-preview">
            <div class="pricing-cards">
              <button
                v-for="category in pricingData"
                :key="category.id"
                type="button"
                :class="['pricing-card', { active: activePricingId === category.id }]"
                @click="activePricingId = category.id"
              >
                <h3>{{ category.title }}</h3>
                <p>{{ category.description }}</p>
              </button>
            </div>
            <div class="pricing-details" v-if="activePricingCategory">
              <h3>{{ activePricingCategory.title }}</h3>
              <div class="pricing-list">
                <div v-for="item in activePricingCategory.items" :key="item.id" class="pricing-item">
                  <div>
                    <h4>{{ item.title }}</h4>
                    <p>{{ item.titleUk }}</p>
                  </div>
                  <div>{{ item.price }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="content-section" v-if="activeSection === 'calAF'">
          <div class="section-header">
            <h2>calAF заявки</h2>
            <button class="small-btn" @click="loadCalLeads">Оновити заявки</button>
          </div>
          <div v-if="calLoading" class="status">Завантаження...</div>
          <div v-if="calError" class="error">{{ calError }}</div>
          <table v-if="!calLoading && !calError" class="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Ім'я</th>
                <th>Телефон</th>
                <th>Email</th>
                <th>Кімнат</th>
                <th>Кімнати</th>
                <th>Послуги</th>
                <th>Площі</th>
                <th>Коментар</th>
                <th>Дата</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="calLeads.length === 0">
                <td colspan="10">Заявок поки немає</td>
              </tr>
              <tr v-for="lead in calLeads" :key="lead.id">
                <td>{{ lead.id }}</td>
                <td>{{ lead.name }}</td>
                <td>{{ lead.phone }}</td>
                <td>{{ lead.email || '—' }}</td>
                <td>{{ lead.roomCount }}</td>
                <td>{{ lead.selectedRooms.join(', ') }}</td>
                <td>{{ formatServices(lead.servicesByRoom) }}</td>
                <td>{{ formatAreas(lead.areasByRoom) }}</td>
                <td>{{ lead.comment || '—' }}</td>
                <td>{{ new Date(lead.createdAt).toLocaleString() }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="content-section" v-if="activeSection === 'pa'">
          <div class="section-header">
            <h2>PA прайс-адмін</h2>
            <button class="small-btn" @click="loadPaCategories">Оновити</button>
          </div>
          <div v-if="paLoading" class="status">Завантаження...</div>
          <div v-if="paError" class="error">{{ paError }}</div>
          <div class="admin-forms">
            <div class="form-block">
              <h3>Нова категорія</h3>
              <label>
                ID
                <input v-model="categoryForm.id" />
              </label>
              <label>
                Заголовок
                <input v-model="categoryForm.title" />
              </label>
              <label>
                Опис
                <textarea v-model="categoryForm.description"></textarea>
              </label>
              <button class="small-btn" @click.prevent="createPaCategory">Додати категорію</button>
            </div>
            <div class="form-block">
              <h3>Новий елемент</h3>
              <label>
                Категорія
                <select v-model="itemForm.categoryId">
                  <option v-for="category in paCategories" :key="category.id" :value="category.id">
                    {{ category.title }}
                  </option>
                </select>
              </label>
              <label>
                Назва
                <input v-model="itemForm.title" />
              </label>
              <label>
                Назва українською
                <input v-model="itemForm.titleUk" />
              </label>
              <label>
                Ціна
                <input v-model="itemForm.price" />
              </label>
              <button class="small-btn" @click.prevent="createPaItem">Додати елемент</button>
            </div>
          </div>
          <div class="category-list">
            <div v-if="paCategories.length === 0">Категорій не знайдено.</div>
            <div v-for="category in paCategories" :key="category.id" class="category-card">
              <div class="category-card-header">
                <h4>{{ category.title }} ({{ category.id }})</h4>
                <button class="small-btn danger" @click="deletePaCategory(category.id)">Видалити</button>
              </div>
              <p>{{ category.description }}</p>
              <div v-if="category.items.length === 0">Немає елементів</div>
              <ul>
                <li v-for="item in category.items" :key="item.id">
                  {{ item.title }} / {{ item.titleUk }} — {{ item.price }}
                  <button class="small-btn danger" @click="deletePaItem(item.id)">Видалити</button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="content-section" v-if="activeSection === 'calA'">
          <div class="section-header">
            <h2>calA прайс-адмін</h2>
            <button class="small-btn" @click="loadCalACategories">Оновити</button>
          </div>
          <div v-if="calALoading" class="status">Завантаження...</div>
          <div v-if="calAError" class="error">{{ calAError }}</div>
          <div class="admin-forms">
            <div class="form-block">
              <h3>Нова категорія</h3>
              <label>
                ID
                <input v-model="calACategoryForm.id" />
              </label>
              <label>
                Заголовок
                <input v-model="calACategoryForm.title" />
              </label>
              <label>
                Опис
                <textarea v-model="calACategoryForm.description"></textarea>
              </label>
              <button class="small-btn" @click.prevent="createCalACategory">Додати категорію</button>
            </div>
            <div class="form-block">
              <h3>Новий елемент</h3>
              <label>
                Категорія
                <select v-model="calAItemForm.categoryId">
                  <option v-for="category in calACategories" :key="category.id" :value="category.id">
                    {{ category.title }}
                  </option>
                </select>
              </label>
              <label>
                Назва
                <input v-model="calAItemForm.title" />
              </label>
              <label>
                Назва українською
                <input v-model="calAItemForm.titleUk" />
              </label>
              <label>
                Ціна
                <input v-model="calAItemForm.price" />
              </label>
              <label>
                Тип ціни
                <select v-model="calAItemForm.priceType">
                  <option value="fixed">fixed</option>
                  <option value="m2">m2</option>
                </select>
              </label>
              <button class="small-btn" @click.prevent="createCalAItem">Додати елемент</button>
            </div>
          </div>
          <div class="category-list">
            <div v-if="calACategories.length === 0">Категорій не знайдено.</div>
            <div v-for="category in calACategories" :key="category.id" class="category-card">
              <div class="category-card-header">
                <h4>{{ category.title }} ({{ category.id }})</h4>
                <button class="small-btn danger" @click="deleteCalACategory(category.id)">Видалити</button>
              </div>
              <p>{{ category.description }}</p>
              <div v-if="category.items.length === 0">Немає елементів</div>
              <ul>
                <li v-for="item in category.items" :key="item.id">
                  {{ item.title }} / {{ item.titleUk }} — {{ item.price }} {{ item.priceType === 'm2' ? '/м²' : '' }}
                  <button class="small-btn danger" @click="deleteCalAItem(item.id)">Видалити</button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="content-section" v-if="activeSection === 'discounts'">
          <div class="section-header">
            <h2>Знижка для калькулятора</h2>
            <button class="small-btn" @click="loadGlobalDiscount">Оновити</button>
          </div>
          <div v-if="discountLoading" class="status">Завантаження...</div>
          <div v-if="discountError" class="error">{{ discountError }}</div>

          <div class="form-block" style="max-width: 360px">
            <div v-if="globalDiscount > 0" class="discount-current">
              Активна знижка: <span class="discount-badge">−{{ globalDiscount }}%</span>
            </div>
            <div v-else style="color: rgba(255,255,255,0.5); margin-bottom: 16px">Знижки немає</div>

            <label>
              Нова знижка (%)
              <input v-model.number="discountPercent" type="number" min="0" max="99" />
            </label>
            <div style="display:flex; gap:10px; margin-top:12px">
              <button class="small-btn" @click.prevent="saveGlobalDiscount">Зберегти</button>
              <button class="small-btn danger" @click.prevent="clearGlobalDiscount">Прибрати знижку</button>
            </div>
          </div>
        </div>

        <div class="content-section" v-if="activeSection === 'difficulties'">
          <div class="section-header">
            <h2>Difficulties — працівники та DirectorMes</h2>
            <button class="small-btn" @click="loadDifficulties">Оновити</button>
          </div>
          <div v-if="diffLoading" class="status">Завантаження...</div>
          <div v-if="diffError" class="error">{{ diffError }}</div>
          <div v-if="diffSaved" class="success-text">Збережено!</div>

          <!-- Toggles -->
          <div style="display:flex; flex-wrap:wrap; gap:12px; margin-bottom:18px">
            <div class="form-block" style="display:flex; align-items:center; gap:16px; padding:14px 18px">
              <label style="font-weight:600; margin:0">Секція DirectorMes:</label>
              <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
                <input type="checkbox" v-model="directorMesVisible" @change="saveDirectorMesToggle" />
                {{ directorMesVisible ? 'Увімкнена' : 'Вимкнена' }}
              </label>
            </div>
            <div class="form-block" style="display:flex; align-items:center; gap:16px; padding:14px 18px">
              <label style="font-weight:600; margin:0">Блок працівників (Difficulties):</label>
              <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
                <input type="checkbox" v-model="workersVisible" @change="saveWorkersToggle" />
                {{ workersVisible ? 'Увімкнений' : 'Вимкнений' }}
              </label>
            </div>
          </div>

          <!-- Workers -->
          <div class="admin-forms" style="grid-template-columns: repeat(3,1fr)">
            <div v-for="(worker, idx) in diffWorkers" :key="idx" class="form-block">
              <h3>Працівник {{ idx + 1 }}</h3>
              <label>
                Ім'я та прізвище
                <input v-model="worker.name" placeholder="Іван Петренко" />
              </label>
              <label>
                Спеціальність
                <input v-model="worker.specialty" placeholder="Майстер плитки" />
              </label>
              <button class="small-btn" style="margin-top:10px" @click.prevent="saveDiffWorker(idx as 0|1|2)">Зберегти</button>
            </div>
          </div>
        </div>

        <div class="content-section" v-if="activeSection === 'icons'">
          <h2>Вибір іконок для головної</h2>
          <div v-if="iconsLoading">Завантаження іконок...</div>
          <div v-if="iconsError" class="error">{{ iconsError }}</div>
          <div v-if="!iconsLoading && !iconsError">
            <div style="display: flex; gap: 24px; flex-wrap: wrap;">
              <div v-for="n in 5" :key="n" style="display: flex; flex-direction: column; align-items: center; gap: 8px; min-width:140px;">
                <label>Іконка {{ n }}</label>
                <select v-model="selectedIcons[n-1]" :disabled="!!selectedIcons[n-1] && typeof selectedIcons[n-1] === 'object'">
                  <option value="">(Не вибрано)</option>
                  <option v-for="icon in iconFiles" :key="icon" :value="icon">{{ icon }}</option>
                </select>
                <input type="file" accept="image/*" @change="e => handleIconFileChange(e, n-1)" style="margin-top:6px" />
                <div v-if="selectedIcons[n-1]">
                  <img
                    v-if="typeof selectedIcons[n-1] === 'string'"
                    :src="`/app/assets/icon/${selectedIcons[n-1]}`"
                    alt="icon"
                    style="width:48px;height:48px;object-fit:contain;background:#fff;border-radius:8px;"
                  />
                  <img
                    v-else
                    :src="selectedIcons[n-1].url"
                    :alt="selectedIcons[n-1].name"
                    style="width:48px;height:48px;object-fit:contain;background:#fff;border-radius:8px;"
                  />
                  <div v-if="typeof selectedIcons[n-1] === 'object'" style="font-size:12px;max-width:120px;overflow-wrap:break-word;">{{ selectedIcons[n-1].name }}</div>
                </div>
                <button v-if="selectedIcons[n-1]" class="small-btn danger" style="margin-top:4px;" @click="selectedIcons[n-1]=''">Очистити</button>
              </div>
            </div>
            <button class="login-btn" style="margin-top:24px;" @click="saveIcons">Зберегти іконки</button>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.admin-login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  background: #0f172a;
  color: #e2e8f0;
}

.admin-panel {
  width: 100%;
  max-width: 1200px;
  background: rgba(15, 23, 42, 0.98);
  border: 1px solid rgba(148, 163, 184, 0.25);
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.35);
}

.admin-panel h1 {
  margin: 0 0 24px;
  font-size: 2rem;
  text-align: center;
}

.login-box,
.admin-content {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.login-box label,
.form-block label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 0.95rem;
}

.login-box input,
.form-block input,
.form-block select,
.form-block textarea {
  padding: 10px 12px;
  border: 1px solid rgba(148, 163, 184, 0.4);
  border-radius: 12px;
  background: #111827;
  color: #f8fafc;
}

button {
  cursor: pointer;
  border: none;
  border-radius: 14px;
  padding: 12px 18px;
  font-weight: 600;
}

button:hover {
  opacity: 0.92;
}

.login-btn,
.small-btn {
  background: #2563eb;
  color: white;
}

.logout-btn,
.admin-button.logout,
.small-btn.danger {
  background: #dc2626;
  color: white;
}

.admin-button.link {
  background: #15803d;
  color: white;
}

.admin-button.link:hover {
  background: #16a34a;
}

.error-text,
.error {
  color: #f87171;
}

.success-text {
  color: #34d399;
}

.admin-top-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}

.buttons-grid {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.admin-button {
  background: #334155;
  color: #f8fafc;
  transition: transform 0.2s ease, background 0.2s ease;
}

.admin-button:hover {
  transform: translateY(-2px);
  background: #475569;
}

.instruction-box,
.content-section {
  padding: 20px;
  border-radius: 20px;
  background: rgba(148, 163, 184, 0.08);
  border: 1px solid rgba(148, 163, 184, 0.18);
}

.section-header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  margin-bottom: 18px;
}

.data-table,
.category-card {
  width: 100%;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  border: 1px solid rgba(148, 163, 184, 0.25);
  padding: 12px;
  text-align: left;
}

.data-table th {
  background: rgba(148, 163, 184, 0.16);
}

.thumb {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 8px;
}

.pricing-preview {
  display: grid;
  gap: 18px;
}

.pricing-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
}

.pricing-card {
  padding: 18px;
  border-radius: 18px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  background: rgba(255, 255, 255, 0.05);
  text-align: left;
}

.pricing-card.active {
  background: rgba(37, 99, 235, 0.12);
  border-color: #2563eb;
}

.pricing-item {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(148, 163, 184, 0.12);
}

.admin-forms {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

.form-block {
  padding: 18px;
  border-radius: 20px;
  background: rgba(15, 23, 42, 0.9);
  border: 1px solid rgba(148, 163, 184, 0.2);
}

.category-list {
  display: grid;
  gap: 12px;
}

.category-card {
  padding: 18px;
  border-radius: 18px;
  background: rgba(15, 23, 42, 0.9);
  border: 1px solid rgba(148, 163, 184, 0.2);
}

.category-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.category-card ul {
  padding-left: 0;
  list-style: none;
}

.category-card li {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid rgba(148, 163, 184, 0.1);
}

.status {
  color: #38bdf8;
}

.discount-current {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  font-weight: 600;
  color: #e2e8f0;
}

.discount-list {
  padding: 0;
  list-style: none;
  display: grid;
  gap: 10px;
}

.discount-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 14px;
  background: rgba(148, 163, 184, 0.06);
  border: 1px solid rgba(148, 163, 184, 0.15);
}

.discount-item div {
  display: flex;
  align-items: center;
  gap: 10px;
}

.discount-badge {
  padding: 3px 10px;
  border-radius: 999px;
  background: rgba(34, 197, 94, 0.18);
  color: #34d399;
  font-weight: 700;
  font-size: 13px;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

@media (max-width: 1100px) {
  .admin-forms {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .buttons-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 500px) {
  .buttons-grid {
    grid-template-columns: 1fr;
  }
}
</style>
