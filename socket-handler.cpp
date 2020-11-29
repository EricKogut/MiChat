#include <iostream>
#include <sys/types.h>
#include <unistd.h>
#include <sys/socket.h>
#include <netdb.h>
#include <arpa/inet.h>
#include <string.h>
#include <string>

using namespace std;

int main()
{
    // Create a socket
    int listening = socket(AF_INET, SOCK_STREAM, 0);
    // Check if another application is listening in on socket

    if (listening == -1)
    {
        cerr << "Can't create a socket! Quitting" << endl;
        return -1;
    }

    // Bind the ip address and port to a socket
    sockaddr_in hint;
    hint.sin_family = AF_INET;
    hint.sin_port = htons(54000);
    inet_pton(AF_INET, "0.0.0.0", &hint.sin_addr);

    bind(listening, (sockaddr *)&hint, sizeof(hint));

    // Tell Winsock the socket is for listening
    listen(listening, SOMAXCONN);

    // Wait for a connection
    sockaddr_in client;
    socklen_t clientSize = sizeof(client);

    while (true)
    {
        int clientSocket = accept(listening, (sockaddr *)&client, &clientSize);

        char host[NI_MAXHOST];    // Client's remote name
        char service[NI_MAXSERV]; // Service (i.e. port) the client is connect on

        memset(host, 0, NI_MAXHOST); // same as memset(host, 0, NI_MAXHOST);
        memset(service, 0, NI_MAXSERV);

        if (getnameinfo((sockaddr *)&client, sizeof(client), host, NI_MAXHOST, service, NI_MAXSERV, 0) == 0)
        {
            cout << host << " connected on port " << service << endl;
        }
        else
        {
            inet_ntop(AF_INET, &client.sin_addr, host, NI_MAXHOST);
            cout << host << " connected on port " << ntohs(client.sin_port) << endl;
        }
    }
}
