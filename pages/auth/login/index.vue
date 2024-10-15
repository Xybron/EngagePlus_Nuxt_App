<template>
    <section class="py-12 sm:py-16 lg:py-20 h-screen w-screen relative " style="background-color: #0d2329;">
        <div class="bg-cover bg-center absolute inset-0 z-1 opacity-35" style="background-image: url('/bg/bg.avif');">
            <div class="absolute inset-0 backdrop-blur-[100px]"></div>
        </div>
        <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl relative z-10">
            <div class="max-w-sm mx-auto">
                <div class="text-center mb-10">
                    <img class="w-52 mx-auto" src="/logo.png" alt="" />
                    <h1 class="text-3xl font-bold text-white">Welcome Back</h1>
                    <p class="mt-4 text-sm font-medium text-white">Your AI-powered health companion: Personalized care at your fingertips.</p>
                </div>

                <div class="space-y-4">
                    <div>
                        <label for="" class="text-sm font-bold text-white"> Email </label>
                        <div class="mt-2">
                            <Input type="email" name="" placeholder="Email address" v-model="email"
                                class="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600" />
                        </div>
                    </div>

                    <div>
                        <div class="flex items-center justify-between">
                            <label for="" class="text-sm font-bold text-white"> Password </label>

                            <a href="#" title="" class="text-sm font-medium text-primary hover:text-primary"
                                @click="forgotPassword"> Forgot Password? </a>
                        </div>
                        <div class="mt-2">
                            <Input type="password" name="" placeholder="Password (min. 8 character)" v-model="password" 
                                class="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-primary focus:border-primary sm:text-sm caret-primary" />
                        </div>
                    </div>

                    <div class="relative flex items-center">
                        <div class="flex items-center h-5">
                            <Input type="checkbox" name="remember-password" id="remember-password"
                                class="w-4 h-4  border-gray-300 rounded focus:ring-green-400" />
                        </div>

                        <div class="ml-3">
                            <label for="remember-password" class="text-sm font-medium text-white"> Remember Me
                            </label>
                        </div>
                    </div>

                    <div>
                        <Button @click="login" :disabled="authStore.isLoggingUserIn || authStore.success_LoginUser"
                        class="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-primary border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary hover:bg-primary">
                        <Loader2 v-if="authStore.isLoggingUserIn" class="ml-2 animate-spin" :size="16"></Loader2>
                        <span v-else>Sign In</span>
                    </Button>
                    </div>
                </div>

                <!-- <div class="mt-6 text-center">
                <p class="text-sm font-medium text-white">Don't have an account? <a href="#" title="" class="font-bold hover:underline"> Sign up now </a></p>
            </div> -->
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth/auth.store';
import { Loader2 } from 'lucide-vue-next'

definePageMeta({
    middleware: "already-auth"
})

useHead(
    {
        title: 'Sign In'
    }
)


const authStore = useAuthStore()
const email = ref("")
const password = ref("")

const login = async () => {
    await authStore.loginWithEmail({ email: email.value, password: password.value })

    if (authStore.failed_LoginUser) return alert(authStore.loginFailure.message)

    return useRouter().go(0) //Middleware will handle it from here
}

const forgotPassword = () => alert("Something went wrong")
</script>
