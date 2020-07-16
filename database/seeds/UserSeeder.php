<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();
        for ($i = 0; $i < 20; $i++) {
            DB::table('users')->insert([
                'name' => $faker->name,
                'surname' => $faker->name,
                'email' => $faker->email,
                'password' => bcrypt($faker->name),
                'created_at' => $faker->dateTime,
            ]);
        }
    }
}
