const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
//const { expect } = require('jest');
const fs = require('fs');
const { TIMEOUT } = require('dns');

test('the correct number of lines in the file', async () => {

//(async function example() {
  let driver = await new Builder().forBrowser('firefox').build()
  try {
    await driver.get('https://www.onlyoffice.com/')   
    let resourcesLink = await driver.findElement(By.linkText('RESOURCES'));
    await driver.actions().move({origin: resourcesLink}).perform();
    await driver.findElement(By.linkText('Contacts')).click();
    
    // Найти все элементы с классом "region"
    let regions = await driver.findElements(By.className('companydata'));
    
    let csvData = [];
    
    // Извлечь текст из каждого найденного элемента
    for (let i = 1; i < regions.length; i++) {
        
        let region = await driver.findElement(By.css(`.companydata:nth-child(${i}) .region`)).getText();  
        let name = await driver.findElement(By.css(`.companydata:nth-child(${i}) span:nth-child(2)`)).getText();
        let spans = await driver.findElements(By.css(`.companydata:nth-child(${i}) > span`));
            
        let rowtext = [];
        for (let span = 3; span <= spans.length; span++) {
            text = await driver.findElement(By.css(`.companydata:nth-child(${i}) > span:nth-child(${span})`)).getText();
            rowtext.push(text);
        }
        str = region + '; ' + name + '; ' + rowtext.join('');
        
        csvData.push(str);
    }
  
    const fileStream = fs.createWriteStream('data.csv', { flags: 'w' });  
    csvData.forEach(item => {
        fileStream.write('"' +  item + '"' + '\n');
    });  
    fileStream.end();
// Чтение содержимого файла
const fileContent = fs.readFileSync('data.csv', 'utf8');
const lines = fileContent.split('\n');
const numberOfLines = lines.length;

await expect(numberOfLines).toEqual(regions.length);

  } finally {
    await driver.quit()
  }
}, 130000);

//})
