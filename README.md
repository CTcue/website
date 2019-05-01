<p align="center"><img src="https://ctcue.com/img/ctcue-logo@2x.png" alt="CTCUE"></p>

# CTcue website

Find patients in an instant. Searching through medical records for patients matching specific criteria is a arduous and time-consuming process. Our intelligent search engine makes the information you need instantly available.


## Development

* To create the stylesheets from `.less` files and minify them:

```bash
yarn

yarn run build
```

* Then run the update script (similar to):

```bash
rsync -avh --exclude="ctcue-theme" --exclude=".*" website /var/www --delete
```
