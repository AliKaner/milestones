import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";
import { ConvexError } from "convex/values";

/**
 * Username + şifre ile giriş.
 * Convex Auth'un Password provider'ı hesap kimliği olarak `email` alanını kullanır;
 * biz buraya username'i yazıyoruz (e-posta yok). `username` alanı users tablosuna
 * da işlenir, böylece arayüzde kullanıcı adını gösterebiliriz.
 */
const CustomPassword = Password({
  profile(params) {
    const username = String(params.email ?? "").trim();
    const password = String(params.password ?? "");
    if (username.length < 3) {
      throw new ConvexError("Kullanıcı adı en az 3 karakter olmalı.");
    }
    if (/\s/.test(username)) {
      throw new ConvexError("Kullanıcı adı boşluk içeremez.");
    }
    if (password.length < 6) {
      throw new ConvexError("Şifre en az 6 karakter olmalı.");
    }
    return { email: username, username };
  },
});

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [CustomPassword],
});
