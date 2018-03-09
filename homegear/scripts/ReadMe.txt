Usage:

Also see: https://ref.homegear.eu

= Built-in script engine =

Create a Homegear object:

    $hg = new \Homegear\Homegear();

Call any RPC method on the newly created object:

    $hg->setValue(142, 1, "STATE", true);
	
To execute a script, you can either use the RPC method "runScript" or the shell command "homegear -e runScript YourScript.php".

See Test.php for an example.

= RPC calls over TCP socket connection =

Require the file "Client.php" somewhere at the top of your PHP file:

	require_once("Client.php");

Create a new instance of the client with:

	With SSL:
	$Client = new \XMLRPC\Client(HOSTNAME, PORT, true);

	Without SSL:
	$Client = new \XMLRPC\Client(HOSTNAME, PORT, false);

SSL options:
	To enable/disable certificate verification:
		$Client->setSSLVerifyPeer(true);
	
	To set the path to your CA certificate (needed when certificate verification is enabled):
		$Client->setCAFile("/path/to/ca.crt");
		
	To set your Homegear username and password:
		$Client->setUsername(USERNAME);
		$Client->setPassword(PASSWORD);
	
And then invoke XML RPC methods with:

	$Client->send("METHODNAME", array(PARAMETERS));
	
See Test.php for an example.
