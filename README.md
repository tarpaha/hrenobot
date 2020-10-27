# Hrenobot

## Description

This is a Telegram bot written on Node.JS with microservices. It waits for user messages and somehow reacts to them.

## Microservices

Execution flow:

* *Bot* receive message from Telegram chat and send it to *Respondent*
* *Respondent* extract part of the message and send it to *Librarian* (other microservices can be connected here)
* *Librarian* search in DB for reaction and send it back to *Respondent*
* *Respondend* receives answer from *Librarian* and send it back to *Bot* (may receive answers from different microservices and decide what to choose)
* if *Bot* received some non-null answer after all this chain then it post it in the Telegram chat.

### Bot

Telegram bot itself. Uses [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api).

For any new message in chat:

* Get text from message
* `POST /` `{ text: _chat_message_text_ }` to **Respondent** microservice
* Wait for the response
* If response contains non-null `answer` field then take it and print in Telegram chat

#### Requirements

Must have `.env` file containing

```text
TELEGRAM_BOT_TOKEN=telegram_token_from_bot_father
```

#### Bot commands

* `/update` - sends `GET /update` to **Respondent** microservice, print in Telegram chat number of updated records returned by **Respondent**

### Respondent

RestAPI service. Receives full chat message from Bot. Decides from were and how to get answer to it. Returns `{ answer: _answer_text_ }`. Returns `{ answer: null }` if cannot find answer.

#### API

* `POST /`
  * Receives data in JSON `{ text: _text_ }`
  * Get last word from `_text_`
  * Send it with `GET /get` to *Librarian*
  * Waits for the response and returns it upper
* `GET /update`
  * Sends `GET /update` to the *Librarian*
  * Waits for the response and returns it upper

### Librarian

Returns reaction for passed word. Uses Google Spreadsheets as storage for `word -> reaction` pairs.

#### API

* `GET /get?text=_text_`
  * Looks for `_text_` key in dictionary
  * Returns `{ reaction: _reaction_ }` if found, `{ reaction: null }` if not.
* `GET /update`
  * Updates internal dictionary with data from Google Spreadheet, returns number of stored records in form `{ records: _records_count_ }`. This takes about second and also limited by Google API (100 request per minute or something).

#### Requirements

Must have `.env` file containing

```text
SPREADSHEET_ID=_google_spreadsheet_uid_
API_KEY=_api_key_for_connected_spreadsheet_api_from_google_console_
```
First sheet of Google Spreadsheet must have two columns named `text` and `reaction`.
