<?php

namespace Uccello\Core\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class InstallCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'uccello:install';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Install Uccello';

    /**
     * The views that need to be exported.
     *
     * @var array
     */
    protected $views = [
        'auth/login.stub' => 'auth/login.blade.php',
        'auth/register.stub' => 'auth/register.blade.php',
        'auth/passwords/email.stub' => 'auth/passwords/email.blade.php',
        'auth/passwords/reset.stub' => 'auth/passwords/reset.blade.php',
        'layouts/uccello.stub' => 'layouts/uccello.blade.php',
        // 'errors/403.stub' => 'errors/403.blade.php',
        // 'errors/404.stub' => 'errors/404.blade.php',
        // 'errors/500.stub' => 'errors/500.blade.php',
    ];

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        // $this->comment('Publishing Uccello Service Provider...');
        // $this->callSilent('vendor:publish', ['--tag' => 'uccello-provider']);

        $this->comment('Publishing Uccello Assets...');
        $this->callSilent('vendor:publish', ['--tag' => 'uccello-assets']);

        $this->comment('Publishing Uccello Configuration...');
        $this->callSilent('vendor:publish', ['--tag' => 'uccello-config']);


        $this->comment('Copying User Model...');
        copy(
            __DIR__.'/stubs/make/app/User.stub',
            app_path('User.php')
        );

        $this->comment('Copying Login Controller...');
        copy(
            __DIR__.'/stubs/make/app/Http/Controllers/Auth/LoginController.stub',
            app_path('Http/Controllers/Auth/LoginController.php')
        );

        $this->comment('Copying Views...');
        foreach ($this->views as $key => $value) {
            copy(
                __DIR__.'/stubs/make/views/'.$key,
                resource_path('views/'.$value)
            );
        }

        $this->comment('Executing make:auth...');
        $this->callSilent('make:auth', ['--force' => true]);

        $this->registerJWT();
    }

    /**
     * Publish JWT and generated JWT secret
     *
     * @return void
     */
    protected function registerJWT()
    {
        $this->callSilent('vendor:publish', [
            '--provider' => 'Tymon\JWTAuth\Providers\LaravelServiceProvider'
        ]);

        // Generate JWT Secret if it does not exist yet (else there is an error)
        if (empty(env('JWT_SECRET'))) {
            $this->comment('Generating JWT Secret...');
            $this->callSilent('jwt:secret');
        }
    }
}