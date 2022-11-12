import { fkweb } from "./fkwebDatabase"
import { db } from "../db"
import { FkUser, RoleUserMap, Users } from "../tableTypes"

// TODO: Add date of birth, phone number, identity confirmation

export const migrateUsers = async () => {
  const query = await fkweb<FkUser>("fk_user").select(
    "id",
    "password",
    "last_login",
    "is_superuser",
    "first_name",
    "last_name",
    "email",
    "is_active",
    "date_joined",
    "date_of_birth",
    "identity_confirmed",
    "phone_number",
  )

  await db<Users>("users").insert({
    id: 0,
    password: "",
    email: "RESERVED@USER.COM",
    first_name: "RESERVED USER",
    last_name: "FOR MIGRATIONS",
  })

  await Promise.all(
    query.map(
      async ({
        id,
        password,
        last_login,
        is_superuser,
        first_name,
        last_name,
        email,
        is_active,
        date_joined,
        date_of_birth,
        identity_confirmed,
        phone_number,
      }) => {
        await db<Users>("users").insert({
          id,
          password,
          banned: !is_active,
          email,
          last_logged_in_at: last_login,
          first_name,
          last_name,
          created_at: date_joined,
        })
        if (is_superuser)
          await db<RoleUserMap>("role_user_map").insert({ user_id: id, role_id: 1 })
      },
    ),
  )
}
