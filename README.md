
Backend
- composer install
- open xampp
- php artisan migrate or php artisan migrate:fresh
- php artisan serve
- php artisan queue:work


Frontend
- npm install

git fetch --all; git branch -r | ForEach-Object {
    $branch = $_.Trim()
    if ($branch -notmatch '->') {
        $local = $branch -replace 'origin/', ''
        if (-not (git branch --list $local)) {
            git branch --track $local $branch | Out-Null
        }
        git checkout $local
        git pull
    }
}