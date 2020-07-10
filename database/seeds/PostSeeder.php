<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();
        for($i=22;$i<=41;$i++){
            DB::table('posts')->insert([
                'user_id' => $i,
                'post' => $faker->text(),
                'created_at' => $faker->dateTime
            ]);
        }
    }
}
