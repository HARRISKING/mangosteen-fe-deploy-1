import { defineComponent, ref, Transition, VNode, watchEffect } from 'vue'
import { RouteLocationNormalizedLoaded, RouterView, useRoute, useRouter } from 'vue-router'
import { useSwipe } from '../hooks/useSwipe'
import { throttle } from '../shared/throttle'
import s from './AdvicePage.module.scss'
import { Form, FormItem } from '../shared/Form'
import { Button } from '../shared/Button'
const pushMap: Record<string, string> = {
  Welcome1: '/welcome/2',
  Welcome2: '/welcome/3',
  Welcome3: '/welcome/4',
  Welcome4: '/items'
}
export const AdvicePage = defineComponent({
  setup: (props, context) => {
    const main = ref<HTMLElement>()
    const { direction, swiping } = useSwipe(main, { beforeStart: (e) => e.preventDefault() })
    const route = useRoute()
    const router = useRouter()
    const replace = throttle(() => {
      const name = (route.name || 'Welcome1').toString()
      router.replace(pushMap[name])
    }, 500)
    watchEffect(() => {
      if (swiping.value && direction.value === 'left') {
        replace()
      }
    })
    const onSubmit = async (e: Event) => {}
    return () => (
      <div class={s.wrapper}>
        <header>
          <svg>
            <use xlinkHref="#mangosteen"></use>
          </svg>
          <h1>记账宝</h1>
        </header>
        <main class={s.main} ref={main}>
          <RouterView name="main">
            {' '}
            <Form onSubmit={onSubmit}>
              <FormItem
                label="意见建议"
                type="text"
                // v-model={formData.name}
                // error={errors['name']?.[0]}
              />

              <FormItem>
                <Button type="submit" class={[s.button]}>
                  确定
                </Button>
              </FormItem>
            </Form>
          </RouterView>
        </main>
        <footer>
          <RouterView name="footer" />
        </footer>
      </div>
    )
  }
})
