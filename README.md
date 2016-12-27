# battleship

To play the game please visit to:

Player 1:
http://ec2-52-90-29-224.compute-1.amazonaws.com:8081/game/1
Player 2:
http://ec2-52-90-29-224.compute-1.amazonaws.com:8081/game/2

It uses sessions so please use an incognito window to play with both players at the same time.

To save development time I made the ships positioning random, to have a full playable game during the duration of the test saving a lot of time.

I'm using the following stack:

- NodeJS Web server and API (alltogether)
- Webpack
- React + Babel for the front
- jQuery for AJAX (for KISS)
- Customer CSS file, to save time I didn't include any framework at this time.
