# Projects

### 01-xrpl-connect
Usage: 'node connect-and-list.js [xrpl_address]'
Based on: https://coil.com/p/wietse/Coding-the-XRP-ledger-A-beginners-course-/kKu7G0Hhq
- lists the XRP amount and last 10 transactions for the given address
- defaults to address provided from the environment (.env file)

### 02-xrpl-memo-send
Usage: 'node send-with-memo.js <xrpAmount> [destination]'
Based on: https://gist.github.com/WietseWind/2b83b59a534d8994c6c9af73518291f6
- sends the defined amount of XRPs (first param) to the destination address
- sender address and secret are read from environment (.env file)
- destination (second param) is defaulted to env value

--- outstanding:

*** https://runkit.com/wietsewind/

*** gists:

Bithomp XRPL account replace with known name:
https://gist.github.com/WietseWind/16512e7f90cc3f7c3e802663dca21189

Create Five Bells Condition (cryptoconditions) for XRPL Escrow:
https://gist.github.com/WietseWind/218b85ca302fd94f76213a8562497662

Sample fetching all transaction data for specific XRP account from the XRP ledger:
https://gist.github.com/WietseWind/2ace90ee0c65ef473fea00a3b520cb9b

Fetch specifix XRP transactions for ledger index:
https://gist.github.com/WietseWind/b871c69c9f5ff82b445119871e6e9198

XRPL presentation - Meetup: links
https://gist.github.com/WietseWind/1e9779e3a2977bbac014240769830a7b

XRP (XRPL) EscrowCreate using NodeJS (featuring Memos)
- Used for: https://twitter.com/WietseWind/status/998968185532579840
https://gist.github.com/WietseWind/e5310ca295a18aedad0617a586657cb7
